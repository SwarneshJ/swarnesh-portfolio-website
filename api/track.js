import { createHash } from 'node:crypto';
import { isConfigured, pipeline } from './_redis.js';

const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|pingdom|uptime|facebookexternalhit|whatsapp|curl|wget/i;

const deviceOf = (ua) => (/ipad|tablet/i.test(ua) ? 'Tablet' : /mobi|android|iphone/i.test(ua) ? 'Mobile' : 'Desktop');

const browserOf = (ua) => {
    if (/edg\//i.test(ua)) return 'Edge';
    if (/firefox|fxios/i.test(ua)) return 'Firefox';
    if (/chrome|crios/i.test(ua)) return 'Chrome';
    if (/safari/i.test(ua)) return 'Safari';
    return 'Other';
};

const clean = (v, max = 80) => String(v || '').replace(/[\r\n]/g, '').slice(0, max);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    if (!isConfigured) return res.status(204).end();

    const ua = req.headers['user-agent'] || '';
    if (BOT.test(ua)) return res.status(204).end();

    let body = req.body;
    if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch { body = {}; }
    }
    const path = clean(body?.path || '/', 120);
    if (!path.startsWith('/') || path.startsWith('/metrics')) return res.status(204).end();
    const source = clean(body?.source, 60).toLowerCase();

    const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
    const country = clean(req.headers['x-vercel-ip-country'] || 'XX', 2).toUpperCase();
    let city = '';
    try { city = decodeURIComponent(req.headers['x-vercel-ip-city'] || ''); } catch { city = ''; }
    city = clean(city, 60);

    const day = new Date().toISOString().slice(0, 10);
    const visitor = createHash('sha256').update(`${ip}|${ua}|${process.env.METRICS_SALT || 'salt'}`).digest('hex').slice(0, 24);

    try {
        await pipeline([
            ['INCR', 'm:total'],
            ['HINCRBY', 'm:paths', path, 1],
            ['HINCRBY', 'm:countries', country, 1],
            ...(city ? [['HINCRBY', 'm:cities', `${city}, ${country}`, 1]] : []),
            ...(source ? [['HINCRBY', 'm:sources', source, 1]] : []),
            ['HINCRBY', 'm:devices', deviceOf(ua), 1],
            ['HINCRBY', 'm:browsers', browserOf(ua), 1],
            ['HINCRBY', 'm:daily', day, 1],
            ['PFADD', 'm:uniq:all', visitor],
            ['PFADD', `m:uniq:${day}`, visitor],
            ['EXPIRE', `m:uniq:${day}`, 60 * 60 * 24 * 90],
            ['HSETNX', 'm:since', 'date', day]
        ]);
    } catch {
        return res.status(204).end();
    }
    return res.status(204).end();
}
