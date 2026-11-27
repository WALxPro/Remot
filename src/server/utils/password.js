import {
  randomBytes,
  scrypt,
  timingSafeEqual,
} from "node:crypto";

import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

const SALT_LENGTH = 16;
const KEY_LENGTH = 64;

const SCRYPT_OPTIONS = {
  N: 131072,
  r: 8,
  p: 1,
  maxmem: 256 * 1024 * 1024,
};

export async function hashPassword(password) {
  const salt = randomBytes(SALT_LENGTH).toString("hex");

  const derivedKey = await scryptAsync(
    password,
    salt,
    KEY_LENGTH,
    SCRYPT_OPTIONS
  );

  return `scrypt:${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password, passwordHash) {
  if (typeof password !== "string") {
    return false;
  }

  if (typeof passwordHash !== "string") {
    return false;
  }

  const parts = passwordHash.split(":");

  if (parts.length !== 3) {
    return false;
  }

  const [algorithm, salt, storedKey] = parts;

  if (algorithm !== "scrypt") {
    return false;
  }

  if (
    !/^[a-f0-9]{32}$/.test(salt) ||
    !/^[a-f0-9]{128}$/.test(storedKey)
  ) {
    return false;
  }

  const derivedKey = await scryptAsync(
    password,
    salt,
    KEY_LENGTH,
    SCRYPT_OPTIONS
  );

  const storedKeyBuffer = Buffer.from(storedKey, "hex");

  return timingSafeEqual(derivedKey, storedKeyBuffer);
}