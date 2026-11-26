import { z } from "zod";

const safeText = () =>
  z.string().refine(
    (value) => !value.includes("\u0000"),
    { message: "Null characters are not allowed" }
  );

export const blogSlugSchema = z
  .string()
  .trim()
  .min(1, "Slug is required")
  .max(255)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Invalid slug format"
  );

const blogFields = z.strictObject({
  title: safeText().trim().min(1, "Title is required").max(255),

  description: safeText().trim().min(1),

  content: safeText().trim().min(1),

  featuredImage: z
    .url({
      protocol: /^https?$/,
    })
    .refine(
      (value) => !value.includes("\u0000"),
      { message: "Null characters are not allowed" }
    )
    .nullable()
    .optional(),

  category: safeText().trim().min(1).max(100),

  status: z.enum(["draft", "published"]),

  metaTitle: safeText().trim().max(255).nullable().optional(),

  metaDescription: safeText().trim().nullable().optional(),
});

export const createBlogSchema = blogFields.extend({
  status: blogFields.shape.status.default("draft"),
});

export const updateBlogSchema = blogFields
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });