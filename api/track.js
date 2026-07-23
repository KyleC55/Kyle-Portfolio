import { redis, VISITS_KEY } from "./_redis.js";

/**
 * Records one visit, bucketed by country.
 *
 * The visitor's country is read from Vercel's edge geo header
 * (`x-vercel-ip-country`, an ISO-2 code) — no IP is stored, only an
 * aggregate per-country counter. Called at most once per browser session
 * from the frontend, so refreshes don't inflate the numbers.
 */
export default async function handler(req, res) {
  const country =
    req.headers["x-vercel-ip-country"] ||
    req.headers["x-country"] || // some proxies use this
    null;
  const debug = req.url && req.url.includes("debug=1");

  try {
    // Ignore unknown / local ("XX") geo so the globe stays clean.
    if (country && /^[A-Z]{2}$/.test(country) && country !== "XX") {
      await redis.hincrby(VISITS_KEY, country, 1);
    }

    res.status(200).json({ ok: true, country, tracked: Boolean(country) });
  } catch (err) {
    // Never break the page over analytics — fail silently for real users,
    // but expose the reason when explicitly asked with ?debug=1.
    res.status(200).json({
      ok: false,
      country,
      error: debug ? String(err?.message || err) : undefined,
      hasUrl: debug
        ? Boolean(process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL)
        : undefined,
      hasToken: debug
        ? Boolean(process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN)
        : undefined,
      // Names only (never values) of every Redis-ish env var actually present.
      envKeys: debug
        ? Object.keys(process.env).filter((k) => /REDIS|UPSTASH|KV/i.test(k))
        : undefined,
    });
  }
}
