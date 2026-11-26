import { z } from "zod";

export const BLOG_STATUS_VALUES = ["draft", "published"];
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const isBrowserFile = (value) => typeof File !== "undefined" && value instanceof File;

export const safeText = () => z.string().refine((value) => !value.includes("\u0000"), { message: "Null characters are not allowed" });
export const blogTextFields = {
  title: safeText().trim().min(1, "Title is required").max(255),
  description: safeText().trim().min(1),
  content: safeText().trim().min(1),
  category: safeText().trim().min(1).max(100),
  status: z.enum(BLOG_STATUS_VALUES),
  metaTitle: safeText().trim().max(255).nullable().optional(),
  metaDescription: safeText().trim().nullable().optional(),
};

function hasMeaningfulContent(html) {
  if (typeof window === "undefined") return html.trim().length > 0;
  const document = new DOMParser().parseFromString(html, "text/html");
  const text = document.body.textContent?.replace(/\u00a0/g, " ").trim();
  return Boolean(text || document.querySelector("img[src]"));
}

const clientFeaturedImage = z.union([
  z.string().url("Featured image must be a valid URL"),
  z.custom(isBrowserFile, "Please select a valid image file"),
  z.null(),
]);

export const blogFormSchema = z.object({
  ...blogTextFields,
  content: blogTextFields.content.refine(hasMeaningfulContent, "Blog content cannot be empty"),
  featuredImage: clientFeaturedImage.superRefine((file, context) => {
    if (!isBrowserFile(file)) return;
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) context.addIssue({ code: "custom", message: "Only JPEG, PNG and WebP images are allowed" });
    if (file.size === 0) context.addIssue({ code: "custom", message: "Image cannot be empty" });
    if (file.size > MAX_IMAGE_SIZE) context.addIssue({ code: "custom", message: "Image size must not exceed 5 MB" });
  }),
});
