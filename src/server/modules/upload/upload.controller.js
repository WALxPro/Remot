import * as uploadService from "./upload.service";

import {
  successResponse,
  errorResponse,
  handleError,
} from "@/server/utils/response";

export async function uploadImage(request) {
  try {
    const contentType = request.headers.get("content-type");

    if (
      !contentType
        ?.toLowerCase()
        .startsWith("multipart/form-data")
    ) {
      return errorResponse(
        "Content-Type must be multipart/form-data",
        415
      );
    }

    let formData;

    try {
      formData = await request.formData();
    } catch (error) {
      if (error instanceof TypeError) {
        return errorResponse("Invalid form data", 400);
      }

      throw error;
    }

    const file = formData.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return errorResponse("Image file is required", 400);
    }

    const image = await uploadService.uploadImage(file);

    return successResponse(
      "Image uploaded successfully",
      image,
      201
    );
  } catch (error) {
    return handleError(error);
  }
}