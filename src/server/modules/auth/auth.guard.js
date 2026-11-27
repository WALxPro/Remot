import { cache } from "react";
import { redirect } from "next/navigation";

import { getSessionCookie } from "./auth.session";
import { getAdminSession } from "./auth.service";

import { verifyRequestOrigin } from "@/server/utils/verifyRequestOrigin";
import { checkRateLimit } from "@/server/utils/rateLimiter";

import {
  errorResponse,
  handleError,
} from "@/server/utils/response";

// GET CURRENT ADMIN
export const getCurrentAdmin = cache(async () => {
  const token = await getSessionCookie();

  if (!token) {
    return null;
  }

  const session = await getAdminSession(token);

  if (!session) {
    return null;
  }

  return {
    id: session.adminId,
    email: session.email,
  };
});

// PROTECT ADMIN PAGES
export async function requireAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
}

// PROTECT ADMIN API ROUTES
export function withAdminAuth(handler, limiter = null) {
  return async function protectedHandler(request, context) {
    try {
      if (!verifyRequestOrigin(request)) {
        return errorResponse("Invalid request origin.", 403);
      }

      const admin = await getCurrentAdmin();

      if (!admin) {
        return errorResponse("Unauthorized.", 401);
      }

      if (limiter) {
        const rateLimitResponse = await checkRateLimit(
          limiter,
          admin.id
        );

        if (rateLimitResponse) {
          return rateLimitResponse;
        }
      }

      return await handler(request, context);
    } catch (error) {
      return handleError(error);
    }
  };
}