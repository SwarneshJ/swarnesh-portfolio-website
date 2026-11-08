const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

export const isConfigured = Boolean(url && token);

export async function pipeline(commands) {
    const res = await fetch(`${url}/pipeline`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(commands)
    });
    if (!res.ok) throw new Error(`Redis ${res.status}`);
    const out = await res.json();
    return out.map((r) => {
        if (r.error) throw new Error(r.error);
        return r.result;
    });
}
