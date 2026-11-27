import { isIP } from "node:net";

export function getClientIp(request) {
  if (process.env.VERCEL === "1") {
    const ip = request.headers
      .get("x-forwarded-for")
      ?.trim();

    if (ip && isIP(ip)) {
      return ip;
    }

    return "unknown";
  }

  if (process.env.NODE_ENV === "development") {
    return "127.0.0.1";
  }

  return "unknown";
}