const SAFE_METHODS = new Set([
  "GET",
  "HEAD",
  "OPTIONS",
]);

export function verifyRequestOrigin(request) {
  if (SAFE_METHODS.has(request.method.toUpperCase())) {
    return true;
  }

  const origin = request.headers.get("origin");

  if (!origin) {
    return false;
  }

  const configuredOrigin = process.env.APP_ORIGIN;

  if (!configuredOrigin) {
    return false;
  }

  try {
    const expectedOrigin = new URL(configuredOrigin).origin;

    return origin === expectedOrigin;
  } catch {
    return false;
  }
}