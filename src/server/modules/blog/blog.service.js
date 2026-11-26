import { z } from "zod";
import sanitizeHtml from "sanitize-html";

import * as blogRepository from "./blog.repository";

import { sanitizeBlogContent } from "@/server/utils/sanitizeBlogContent";

import {
  createBlogSchema,
  updateBlogSchema,
  blogSlugSchema,
} from "./blog.schema";

const paginationInteger = (max, defaultValue) =>
  z
    .string()
    .regex(/^[0-9]+$/, "Must be a positive integer")
    .transform(Number)
    .pipe(z.number().int().min(1).max(max))
    .prefault(String(defaultValue));

const paginationSchema = z.object({
  page: paginationInteger(10000, 1),

  limit: paginationInteger(100, 10),

  search: z
    .string()
    .trim()
    .max(255)
    .refine(
      (value) => !value.includes("\u0000"),
      { message: "Null characters are not allowed" }
    )
    .default(""),
});

// SANITIZE AND VALIDATE CONTENT
function sanitizeContent(content) {
  const sanitized = sanitizeBlogContent(content);

  const plainText = sanitizeHtml(sanitized, {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/&nbsp;|&#160;|&#xA0;/gi, " ")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .trim();

  const hasImage = /<img\b[^>]*\bsrc="[^"]+"/i.test(
    sanitized
  );

  if (!plainText && !hasImage) {
    throw new z.ZodError([
      {
        code: "custom",
        path: ["content"],
        message: "Blog content cannot be empty",
      },
    ]);
  }

  return sanitized;
}

// GENERATE SLUG
function generateSlug(title) {
  const slug = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .slice(0, 255)
    .replace(/^-+|-+$/g, "");

  return blogSlugSchema.parse(slug || "blog");
}

// GENERATE UNIQUE SLUG
async function generateUniqueSlug(title, currentSlug = null) {
  const baseSlug = generateSlug(title);

  let slug = baseSlug;
  let counter = 2;

  while (true) {
    const existingBlog =
      await blogRepository.findBlogBySlug(slug);

    if (!existingBlog || existingBlog.slug === currentSlug) {
      return slug;
    }

    const suffix = `-${counter}`;

    slug = `${baseSlug
      .slice(0, 255 - suffix.length)
      .replace(/-+$/g, "")}${suffix}`;

    counter++;
  }
}

// CREATE BLOG
export async function createBlog(data) {
  const validatedData = createBlogSchema.parse(data);

  const slug = await generateUniqueSlug(validatedData.title);

  return blogRepository.createBlog({
    ...validatedData,
    slug,
    content: sanitizeContent(validatedData.content),
  });
}

// READ ALL BLOGS
export async function getBlogs(query = {}) {
  const validatedQuery = paginationSchema.parse(query);

  return blogRepository.findAllBlogs(validatedQuery);
}

// READ BLOG BY SLUG
export async function getBlogBySlug(slug) {
  const validatedSlug = blogSlugSchema.parse(slug);

  return blogRepository.findBlogBySlug(validatedSlug);
}

// READ PUBLISHED BLOGS
export async function getPublishedBlogs() {
  return blogRepository.findPublishedBlogs();
}

// READ PUBLISHED BLOG BY SLUG
export async function getPublishedBlogBySlug(slug) {
  const result = blogSlugSchema.safeParse(slug);

  if (!result.success) {
    return null;
  }

  const blog = await blogRepository.findPublishedBlogBySlug(
    result.data
  );

  if (!blog) {
    return null;
  }

  return {
    ...blog,
    content: sanitizeBlogContent(blog.content),
  };
}

// READ RELATED PUBLISHED BLOGS
export async function getRelatedPublishedBlogs(category, slug) {
  return blogRepository.findRelatedPublishedBlogs(
    category,
    slug
  );
}

// READ SITEMAP ENTRIES
export async function getPublishedBlogSitemapEntries() {
  return blogRepository.findPublishedBlogSitemapEntries();
}

// UPDATE BLOG BY SLUG
export async function updateBlogBySlug(slug, data) {
  const validatedSlug = blogSlugSchema.parse(slug);
  const updates = updateBlogSchema.parse(data);

  const existingBlog =
    await blogRepository.findBlogBySlug(validatedSlug);

  if (!existingBlog) {
    return null;
  }

  if (
    updates.title !== undefined &&
    updates.title !== existingBlog.title
  ) {
    updates.slug = await generateUniqueSlug(
      updates.title,
      existingBlog.slug
    );
  }

  if (updates.content !== undefined) {
    updates.content = sanitizeContent(updates.content);
  }

  return blogRepository.updateBlogBySlug(
    validatedSlug,
    updates
  );
}

// DELETE BLOG BY SLUG
export async function deleteBlogBySlug(slug) {
  const validatedSlug = blogSlugSchema.parse(slug);

  return blogRepository.deleteBlogBySlug(validatedSlug);
}