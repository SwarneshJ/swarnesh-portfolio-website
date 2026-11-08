const IGNORE_KEY = 'metrics-ignore';

export function setIgnoreSelf(on) {
    try {
        if (on) localStorage.setItem(IGNORE_KEY, '1');
        else localStorage.removeItem(IGNORE_KEY);
    } catch { /* storage unavailable */ }
}

export function isIgnoringSelf() {
    try { return localStorage.getItem(IGNORE_KEY) === '1'; } catch { return false; }
}

export function trackPageview(path) {
    if (import.meta.env.DEV || isIgnoringSelf()) return;
    let first = false;
    try {
        first = !sessionStorage.getItem('metrics-seen');
        sessionStorage.setItem('metrics-seen', '1');
    } catch { first = true; }
    let source = '';
    const params = new URLSearchParams(window.location.search);
    if (first) source = params.get('src') || params.get('utm_source') || '';
    if (first && !source && document.referrer) {
        try {
            const host = new URL(document.referrer).hostname.replace(/^www\./, '');
            if (host !== window.location.hostname.replace(/^www\./, '')) source = host;
        } catch { /* bad referrer */ }
    }
    const payload = JSON.stringify({ path, source: first ? source || 'direct' : '' });
    try {
        fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true }).catch(() => {});
    } catch { /* ignore */ }
}
