import { isConfigured, pipeline } from './_redis.js';

const toObject = (flat) => {
    const out = {};
    for (let i = 0; i < (flat || []).length; i += 2) out[flat[i]] = Number(flat[i + 1]);
    return out;
};

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
    if (!isConfigured) return res.status(200).json({ configured: false });

    const days = [];
    for (let i = 29; i >= 0; i--) days.push(new Date(Date.now() - i * 86400000).toISOString().slice(0, 10));

    try {
        const r = await pipeline([
            ['GET', 'm:total'],
            ['PFCOUNT', 'm:uniq:all'],
            ['HGETALL', 'm:paths'],
            ['HGETALL', 'm:countries'],
            ['HGETALL', 'm:cities'],
            ['HGETALL', 'm:sources'],
            ['HGETALL', 'm:devices'],
            ['HGETALL', 'm:browsers'],
            ['HGETALL', 'm:daily'],
            ['HGET', 'm:since', 'date'],
            ...days.map((d) => ['PFCOUNT', `m:uniq:${d}`])
        ]);
        const daily = toObject(r[8]);
        return res.status(200).json({
            configured: true,
            total: Number(r[0] || 0),
            unique: r[1] || 0,
            since: r[9] || null,
            paths: toObject(r[2]),
            countries: toObject(r[3]),
            cities: toObject(r[4]),
            sources: toObject(r[5]),
            devices: toObject(r[6]),
            browsers: toObject(r[7]),
            daily: days.map((d, i) => ({ date: d, views: daily[d] || 0, unique: r[10 + i] || 0 }))
        });
    } catch {
        return res.status(500).json({ configured: true, error: true });
    }
}
