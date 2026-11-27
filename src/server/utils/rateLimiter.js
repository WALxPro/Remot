import { RateLimiterPostgres } from "rate-limiter-flexible";

import { pool } from "@/server/db/connection";
import { errorResponse } from "@/server/utils/response";

function createLimiter(keyPrefix, points, duration) {
  return new RateLimiterPostgres({
    storeClient: pool,
    tableName: "rate_limits",
    tableCreated: true,
    clearExpiredByTimeout: false,
    keyPrefix,
    points,
    duration,
  });
}

export const rateLimiters = {
  login: createLimiter("login", 5, 900),
  logout: createLimiter("logout", 10, 60),
  readBlogs: createLimiter("read_blogs", 120, 60),
  createBlog: createLimiter("create_blog", 20, 60),
  updateBlog: createLimiter("update_blog", 30, 60),
  deleteBlog: createLimiter("delete_blog", 10, 60),
  upload: createLimiter("upload", 20, 60),
};

export async function checkRateLimit(limiter, key) {
  try {
    await limiter.consume(key);

    return null;
  } catch (error) {
    if (Number.isFinite(error?.msBeforeNext)) {
      const retryAfter = Math.max(
        1,
        Math.ceil(error.msBeforeNext / 1000)
      );

      const response = errorResponse(
        "Too many requests. Please try again later.",
        429
      );

      response.headers.set(
        "Retry-After",
        String(retryAfter)
      );

      return response;
    }

    console.error("Rate limiter unavailable:", {
      limiter: limiter.keyPrefix,
      name: error?.name,
      code:
        typeof error?.code === "string" &&
        /^[A-Z0-9_]{1,40}$/.test(error.code)
          ? error.code
          : "UNKNOWN",
    });

    return errorResponse(
      "Service temporarily unavailable.",
      503
    );
  }
}