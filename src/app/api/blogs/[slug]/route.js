import {
  getBlog,
  updateBlog,
  deleteBlog,
} from "@/server/modules/blog/blog.controller";

import { withAdminAuth } from "@/server/modules/auth/auth.guard";
import { rateLimiters } from "@/server/utils/rateLimiter";

export const runtime = "nodejs";

export const GET = withAdminAuth(
  getBlog,
  rateLimiters.readBlogs
);

export const PATCH = withAdminAuth(
  updateBlog,
  rateLimiters.updateBlog
);

export const DELETE = withAdminAuth(
  deleteBlog,
  rateLimiters.deleteBlog
);