import { verifyPassword } from "@/server/utils/password";

import { loginSchema } from "./auth.schema";

import * as authRepository from "./auth.repository";

import {
  generateSessionToken,
  hashSessionToken,
  getSessionExpiry,
} from "./auth.session";

// Used to reduce timing differences for unknown email addresses.
const DUMMY_PASSWORD_HASH =
  `scrypt:${"0".repeat(32)}:${"0".repeat(128)}`;

// LOGIN ADMIN
export async function loginAdmin(data) {
  const { email, password } = loginSchema.parse(data);

  const admin = await authRepository.findAdminByEmail(email);

  const passwordHash =
    admin?.passwordHash ?? DUMMY_PASSWORD_HASH;

  const isPasswordValid = await verifyPassword(
    password,
    passwordHash
  );

  if (!admin || !isPasswordValid) {
    return null;
  }

  await authRepository.deleteExpiredSessions();

  const token = generateSessionToken();

  const tokenHash = hashSessionToken(token);

  const expiresAt = getSessionExpiry();

  await authRepository.createSession({
    adminId: admin.id,
    tokenHash,
    expiresAt,
  });

  return {
    admin: {
      id: admin.id,
      email: admin.email,
    },
    token,
    expiresAt,
  };
}

// VERIFY ADMIN SESSION
export async function getAdminSession(token) {
  if (
    typeof token !== "string" ||
    !/^[a-f0-9]{64}$/.test(token)
  ) {
    return null;
  }

  const tokenHash = hashSessionToken(token);

  return authRepository.findValidSession(tokenHash);
}

// LOGOUT ADMIN
export async function logoutAdmin(token) {
  if (
    typeof token !== "string" ||
    !/^[a-f0-9]{64}$/.test(token)
  ) {
    return;
  }

  const tokenHash = hashSessionToken(token);

  await authRepository.deleteSession(tokenHash);
}