import {
  getBlogs,
  createBlog,
} from "@/server/modules/blog/blog.controller";

import { withAdminAuth } from "@/server/modules/auth/auth.guard";
import { rateLimiters } from "@/server/utils/rateLimiter";

export const runtime = "nodejs";

export const GET = withAdminAuth(
  getBlogs,
  rateLimiters.readBlogs
);

export const POST = withAdminAuth(
  createBlog,
  rateLimiters.createBlog
);