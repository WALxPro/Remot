import { uploadImage } from "@/server/modules/upload/upload.controller";

import { withAdminAuth } from "@/server/modules/auth/auth.guard";
import { rateLimiters } from "@/server/utils/rateLimiter";

export const runtime = "nodejs";

export const POST = withAdminAuth(
  uploadImage,
  rateLimiters.upload
);