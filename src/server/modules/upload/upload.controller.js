import * as uploadService from "./upload.service";

import {
  successResponse,
  errorResponse,
  handleError,
} from "@/server/utils/response";

export async function uploadImage(request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!file) {
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