import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { setIgnoreSelf, isIgnoringSelf } from '../analytics';
import './Metrics.css';

const sampleData = () => {
    const daily = Array.from({ length: 30 }, (_, i) => {
        const d = new Date(Date.now() - (29 - i) * 86400000).toISOString().slice(0, 10);
        const views = Math.round(8 + 14 * Math.abs(Math.sin(i / 3)) + (i > 24 ? 20 : 0));
        return { date: d, views, unique: Math.round(views * 0.6) };
    });
    return {
        configured: true,
        sample: true,
        total: daily.reduce((a, d) => a + d.views, 0),
        unique: 212,
        since: daily[0].date,
        paths: { '/': 190, '/projects': 120, '/meeting-jev': 88, '/about': 41, '/fifa-prediction-pool': 33 },
        countries: { US: 210, IN: 96, GB: 22, CA: 14, DE: 9 },
        cities: { 'Chapel Hill, US': 64, 'Mumbai, IN': 41, 'New York, US': 38, 'London, GB': 17 },
        sources: { direct: 140, 'linkedin.com': 120, 'google.com': 31 },
        devices: { Desktop: 230, Mobile: 118, Tablet: 3 },
        browsers: { Chrome: 210, Safari: 110, Firefox: 21, Edge: 10 },
        daily
    };
};

const regionNames = typeof Intl !== 'undefined' && Intl.DisplayNames ? new Intl.DisplayNames(['en'], { type: 'region' }) : null;
const countryName = (code) => {
    if (code === 'XX') return 'Unknown';
    try { return regionNames ? regionNames.of(code) || code : code; } catch { return code; }
};

const fmt = (n) => Number(n || 0).toLocaleString('en-US');

const RankList = ({ title, data, label = (k) => k, color = 'var(--accent-blue)', limit = 8 }) => {
    const rows = Object.entries(data || {}).sort((a, b) => b[1] - a[1]).slice(0, limit);
    const max = rows[0]?.[1] || 1;
    const sum = Object.values(data || {}).reduce((a, b) => a + b, 0) || 1;
    return (
        <motion.div className="mt-card glass-card" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5 }}>
            <h3 className="mt-card-title">{title}</h3>
            {rows.length === 0 && <p className="mt-empty">No data yet.</p>}
            {rows.map(([k, v]) => (
                <div className="mt-rank" key={k}>
                    <div className="mt-rank-head">
                        <span className="mt-rank-label">{label(k)}</span>
                        <span className="mt-rank-val">{fmt(v)} <em>{Math.round((v / sum) * 100)}%</em></span>
                    </div>
                    <div className="mt-track">
                        <motion.div className="mt-bar" style={{ background: color }} initial={{ width: 0 }} whileInView={{ width: `${(v / max) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
                    </div>
                </div>
            ))}
        </motion.div>
    );
};

const Metrics = () => {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('loading');
    const [ignoring, setIgnoring] = useState(isIgnoringSelf());

    useEffect(() => {
        document.title = 'Site metrics';
        let cancelled = false;
        fetch('/api/metrics')
            .then((r) => (r.ok ? r.json() : Promise.reject()))
            .then((j) => { if (!cancelled) { setData(j); setStatus(j.configured ? 'ok' : 'unconfigured'); } })
            .catch(() => {
                if (cancelled) return;
                if (import.meta.env.DEV) { setData(sampleData()); setStatus('ok'); } else setStatus('error');
            });
        return () => { cancelled = true; };
    }, []);

    const toggleIgnore = () => {
        setIgnoreSelf(!ignoring);
        setIgnoring(!ignoring);
    };

    const daily = data?.daily || [];
    const maxDay = Math.max(1, ...daily.map((d) => d.views));
    const last7 = daily.slice(-7).reduce((a, d) => a + d.views, 0);
    const today = daily[daily.length - 1]?.views || 0;

    return (
        <motion.div className="page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <section className="section-padding">
                <div className="container mt-wrap">
                    <span className="badge">Live</span>
                    <h1 className="section-title mt-title">Site metrics</h1>
                    <p className="section-sub mt-sub">
                        Anonymous traffic for this site. No names or raw IP addresses are stored, only page, approximate location, referrer and device.
                    </p>

                    {status === 'loading' && <p className="mt-empty">Loading...</p>}
                    {status === 'error' && <p className="mt-empty">Metrics are unavailable right now.</p>}
                    {status === 'unconfigured' && <p className="mt-empty">The metrics database isn't connected yet.</p>}

                    {status === 'ok' && data && (
                        <>
                            {data.sample && <p className="mt-note">Sample data shown because the API isn't running locally.</p>}
                            <div className="mt-stats">
                                {[
                                    ['Total views', fmt(data.total)],
                                    ['Unique visitors', fmt(data.unique)],
                                    ['Last 7 days', fmt(last7)],
                                    ['Today', fmt(today)]
                                ].map(([label, value]) => (
                                    <motion.div className="mt-stat glass-card" key={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                        <span className="mt-stat-val">{value}</span>
                                        <span className="mt-stat-label">{label}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-card glass-card mt-daily">
                                <h3 className="mt-card-title">Views, last 30 days</h3>
                                <div className="mt-bars" role="img" aria-label="Daily views for the last 30 days">
                                    {daily.map((d, i) => (
                                        <div className="mt-col" key={d.date} title={`${d.date}: ${d.views} views, ${d.unique} unique`}>
                                            <motion.div className="mt-col-bar" initial={{ height: 0 }} animate={{ height: `${(d.views / maxDay) * 100}%` }} transition={{ duration: 0.7, delay: i * 0.015, ease: [0.16, 1, 0.3, 1] }} />
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-axis"><span>{daily[0]?.date}</span><span>{daily[daily.length - 1]?.date}</span></div>
                            </div>

                            <div className="mt-grid">
                                <RankList title="Top pages" data={data.paths} />
                                <RankList title="Countries" data={data.countries} label={countryName} color="var(--amber)" />
                                <RankList title="Cities" data={data.cities} color="var(--amber)" />
                                <RankList title="Where visitors came from" data={data.sources} color="var(--accent-purple)" />
                                <RankList title="Devices" data={data.devices} />
                                <RankList title="Browsers" data={data.browsers} color="var(--accent-purple)" />
                            </div>

                            <p className="mt-foot">
                                Tracking since {data.since || 'today'}.{' '}
                                <button type="button" className="mt-link" onClick={toggleIgnore}>
                                    {ignoring ? 'Counting my visits again' : "Don't count my own visits on this browser"}
                                </button>
                            </p>
                        </>
                    )}
                </div>
            </section>
        </motion.div>
    );
};

export default Metrics;
