import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const imageUploadSchema = z
  .file()
  .max(MAX_IMAGE_SIZE, "Image size must not exceed 5 MB")
  .mime(
    ALLOWED_IMAGE_TYPES,
    "Only JPEG, PNG and WebP images are allowed"
  )
  .refine(
    (file) => file.size > 0,
    "Image cannot be empty"
  );