import { z } from "zod";

export const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const imageUploadSchema = z
  .file()
  .min(1, "Image cannot be empty")
  .max(MAX_IMAGE_SIZE, "Image size must not exceed 4 MB")
  .mime(
    ALLOWED_IMAGE_TYPES,
    "Only JPEG, PNG and WebP images are allowed"
  );