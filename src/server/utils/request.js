const DEFAULT_MAX_BODY_SIZE = 1024 * 1024;

// READ REQUEST BODY WITH SIZE LIMIT
async function readRequestBody(request, maxBodySize) {
  const reader = request.body?.getReader();

  if (!reader) {
    return Buffer.alloc(0);
  }

  const chunks = [];
  let totalSize = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      totalSize += value.byteLength;

      if (totalSize > maxBodySize) {
        await reader.cancel().catch(() => {});

        const error = new Error("Request body is too large");
        error.code = "BODY_TOO_LARGE";

        throw error;
      }

      chunks.push(value);
    }

    return Buffer.concat(chunks, totalSize);
  } finally {
    reader.releaseLock();
  }
}

// PARSE JSON REQUEST BODY
export async function parseJsonBody(
  request,
  maxBodySize = DEFAULT_MAX_BODY_SIZE
) {
  const body = await readRequestBody(
    request,
    maxBodySize
  );

  return JSON.parse(body.toString("utf8"));
}

// PARSE MULTIPART REQUEST BODY
export async function parseMultipartBody(
  request,
  maxBodySize
) {
  const body = await readRequestBody(
    request,
    maxBodySize
  );

  const response = new Response(body, {
    headers: {
      "Content-Type":
        request.headers.get("content-type") || "",
    },
  });

  return response.formData();
}