const DEFAULT_MAX_BODY_SIZE = 1024 * 1024;

export async function parseJsonBody(
  request,
  maxBodySize = DEFAULT_MAX_BODY_SIZE
) {
  const reader = request.body?.getReader();

  if (!reader) {
    throw new SyntaxError("Invalid JSON request");
  }

  const decoder = new TextDecoder();

  let totalSize = 0;
  let body = "";

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      totalSize += value.byteLength;

      if (totalSize > maxBodySize) {
        await reader.cancel();

        const error = new Error("Request body is too large");
        error.code = "BODY_TOO_LARGE";

        throw error;
      }

      body += decoder.decode(value, {
        stream: true,
      });
    }

    body += decoder.decode();

    return JSON.parse(body);
  } finally {
    reader.releaseLock();
  }
}