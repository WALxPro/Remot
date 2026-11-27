export class ApiError extends Error {
  constructor(
    message,
    { status, fields, retryAfter, cause } = {}
  ) {
    super(message, { cause });

    this.name = "ApiError";
    this.status = status;
    this.fields = fields ?? [];
    this.retryAfter = retryAfter ?? null;
  }
}

export async function request(
  url,
  { body, headers, signal, ...options } = {}
) {
  try {
    const isFormData =
      typeof FormData !== "undefined" &&
      body instanceof FormData;

    const response = await fetch(url, {
      credentials: "same-origin",
      ...options,

      body:
        body === undefined
          ? undefined
          : isFormData
            ? body
            : JSON.stringify(body),

      headers: {
        ...(isFormData
          ? {}
          : body === undefined
            ? {}
            : { "Content-Type": "application/json" }),

        ...headers,
      },

      signal,
    });

    const payload = await response.json().catch(() => null);
    const retryAfter = response.headers.get("Retry-After");

    if (!payload || typeof payload.success !== "boolean") {
      throw new ApiError(
        "The server returned an invalid response.",
        {
          status: response.status,
          retryAfter,
        }
      );
    }

    if (!response.ok || !payload.success) {
      throw new ApiError(
        payload.message || "Request failed.",
        {
          status: response.status,
          fields: payload.errors,
          retryAfter,
        }
      );
    }

    return payload.data;
  } catch (error) {
    if (
      error instanceof ApiError ||
      error?.name === "AbortError"
    ) {
      throw error;
    }

    throw new ApiError(
      "Unable to reach the server. Please try again.",
      { cause: error }
    );
  }
}