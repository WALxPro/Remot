import {
  loginAdmin,
  logoutAdmin,
} from "./auth.service";

import {
  setSessionCookie,
  getSessionCookie,
  clearSessionCookie,
} from "./auth.session";

import { parseJsonBody } from "@/server/utils/request";
import { verifyRequestOrigin } from "@/server/utils/verifyRequestOrigin";
import { getClientIp } from "@/server/utils/getClientIp";

import {
  rateLimiters,
  checkRateLimit,
} from "@/server/utils/rateLimiter";

import {
  successResponse,
  errorResponse,
  handleError,
} from "@/server/utils/response";

const MAX_LOGIN_BODY_SIZE = 4 * 1024;

// LOGIN CONTROLLER
export async function loginController(request) {
  try {
    if (!verifyRequestOrigin(request)) {
      return errorResponse(
        "Invalid request origin.",
        403
      );
    }

    const ip = getClientIp(request);

    const rateLimitResponse = await checkRateLimit(
      rateLimiters.login,
      ip
    );

    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const data = await parseJsonBody(
      request,
      MAX_LOGIN_BODY_SIZE
    );

    const result = await loginAdmin(data);

    if (!result) {
      return errorResponse(
        "Invalid email or password.",
        401
      );
    }

    await setSessionCookie(
      result.token,
      result.expiresAt
    );

    return successResponse("Login successful.", {
      admin: result.admin,
    });
  } catch (error) {
    return handleError(error);
  }
}

// LOGOUT CONTROLLER
export async function logoutController(request) {
  try {
    if (!verifyRequestOrigin(request)) {
      return errorResponse(
        "Invalid request origin.",
        403
      );
    }

    const ip = getClientIp(request);

    const rateLimitResponse = await checkRateLimit(
      rateLimiters.logout,
      ip
    );

    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const token = await getSessionCookie();

    if (token) {
      await logoutAdmin(token);
    }

    await clearSessionCookie();

    return successResponse("Logout successful.");
  } catch (error) {
    return handleError(error);
  }
}