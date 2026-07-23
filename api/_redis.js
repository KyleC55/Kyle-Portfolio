import { Redis } from "@upstash/redis";

/**
 * Shared Redis client for the visitor-map API routes.
 *
 * Reads whichever env-var pair your store exposes:
 *  - Vercel-managed KV  -> KV_REST_API_URL / KV_REST_API_TOKEN
 *  - Upstash integration -> UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
 */
// The REST URL is just the database's public endpoint (not a secret — it's
// useless without the token), so we fall back to it in code when the env var
// is missing/blank. The TOKEN is a credential and is ONLY ever read from env.
const REST_URL =
  process.env.KV_REST_API_URL ||
  process.env.UPSTASH_REDIS_REST_URL ||
  "https://known-ladybird-123812.upstash.io";

export const redis = new Redis({
  url: REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});

/** Redis hash key: country ISO-2 code -> visit count. */
export const VISITS_KEY = "visits:by_country";
