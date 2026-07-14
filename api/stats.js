import { redis, VISITS_KEY } from "./_redis.js";

/**
 * Returns aggregated visit counts per country:
 *   { counts: { US: 142, CA: 30, ... } }
 *
 * Cached at the edge for a minute (with stale-while-revalidate) so the
 * globe loads instantly and we don't hammer Redis on every page view.
 */
export default async function handler(req, res) {
  try {
    const raw = (await redis.hgetall(VISITS_KEY)) || {};

    // Normalize values to numbers (Redis may return them as strings).
    const counts = {};
    for (const [code, value] of Object.entries(raw)) {
      const n = Number(value);
      if (code && Number.isFinite(n) && n > 0) counts[code] = n;
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=300"
    );
    res.status(200).json({ counts });
  } catch (err) {
    res.status(200).json({ counts: {} });
  }
}
