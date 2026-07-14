import { Redis } from "@upstash/redis";

/**
 * Shared Redis client for the visitor-map API routes.
 *
 * Reads whichever env-var pair your store exposes:
 *  - Vercel-managed KV  -> KV_REST_API_URL / KV_REST_API_TOKEN
 *  - Upstash integration -> UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
 */
export const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});

/** Redis hash key: country ISO-2 code -> visit count. */
export const VISITS_KEY = "visits:by_country";
