export function generateBlogSlug(title = "") {
  if (!title.trim()) return "";

  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .slice(0, 255)
    .replace(/^-+|-+$/g, "") || "blog";
}
