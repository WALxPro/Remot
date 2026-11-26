import { z } from "zod";
import { blogTextFields } from "@/lib/validation/blog";

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
  ...blogTextFields,

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

});

export const createBlogSchema = blogFields.extend({
  status: blogFields.shape.status.default("draft"),
});

export const updateBlogSchema = blogFields
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });
