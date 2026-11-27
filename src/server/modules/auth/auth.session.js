import { randomBytes, createHash } from "node:crypto";
import { cookies } from "next/headers";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const SESSION_COOKIE_NAME = IS_PRODUCTION
  ? "__Host-admin_session"
  : "admin_session";

const SESSION_DURATION = 24 * 60 * 60 * 1000;

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: IS_PRODUCTION,
  sameSite: "strict",
  path: "/",
};

// GENERATE SECURE SESSION TOKEN
export function generateSessionToken() {
  return randomBytes(32).toString("hex");
}

// HASH SESSION TOKEN
export function hashSessionToken(token) {
  return createHash("sha256")
    .update(token)
    .digest("hex");
}

// GENERATE SESSION EXPIRY
export function getSessionExpiry() {
  return new Date(Date.now() + SESSION_DURATION);
}

// SET SESSION COOKIE
export async function setSessionCookie(token, expiresAt) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    ...COOKIE_OPTIONS,
    expires: expiresAt,
  });
}

// READ SESSION COOKIE
export async function getSessionCookie() {
  const cookieStore = await cookies();

  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token || !/^[a-f0-9]{64}$/.test(token)) {
    return null;
  }

  return token;
}

// CLEAR SESSION COOKIE
export async function clearSessionCookie() {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, "", {
    ...COOKIE_OPTIONS,
    expires: new Date(0),
    maxAge: 0,
  });
}