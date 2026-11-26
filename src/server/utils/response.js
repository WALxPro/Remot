import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function successResponse(
  message,
  data = null,
  status = 200
) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

export function errorResponse(
  message,
  status = 500,
  errors = null
) {
  return NextResponse.json(
    {
      success: false,
      message,
      ...(errors !== null && { errors }),
    },
    { status }
  );
}

export function handleError(error) {
  if (error instanceof ZodError) {
    return errorResponse(
      "Validation failed",
      400,
      error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }))
    );
  }

  if (error.code === "BODY_TOO_LARGE") {
    return errorResponse(
      "Request body exceeds the maximum size of 1 MB",
      413
    );
  }

  if (error.code === "23505") {
    return errorResponse(
      "A record with this unique value already exists",
      409
    );
  }

  if (error instanceof SyntaxError) {
    return errorResponse("Invalid JSON request", 400);
  }

  console.error("API error:", error);

  return errorResponse("Internal server error", 500);
}