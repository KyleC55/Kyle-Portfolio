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
  try {
    const country =
      req.headers["x-vercel-ip-country"] ||
      req.headers["x-country"] || // some proxies use this
      null;

    // Ignore unknown / local ("XX") geo so the globe stays clean.
    if (country && /^[A-Z]{2}$/.test(country) && country !== "XX") {
      await redis.hincrby(VISITS_KEY, country, 1);
    }

    res.status(200).json({ ok: true, country });
  } catch (err) {
    // Never break the page over analytics — fail silently.
    res.status(200).json({ ok: false });
  }
}
