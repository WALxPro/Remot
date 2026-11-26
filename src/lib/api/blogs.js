import { request } from "./request";

export const blogKeys = {
  all: ["blogs"],
  list: (params) => [...blogKeys.all, "list", params],
  detail: (slug) => [...blogKeys.all, "detail", slug],
};

export function getBlogs({ page = 1, limit = 10, search = "" } = {}, signal) {
  const query = new URLSearchParams({ page: String(page), limit: String(limit), search });
  return request(`/api/blogs?${query}`, { signal });
}

export function getBlog(slug, signal) { return request(`/api/blogs/${encodeURIComponent(slug)}`, { signal }); }
export function createBlog(data) { return request("/api/blogs", { method: "POST", body: data }); }
export function updateBlog(slug, data) { return request(`/api/blogs/${encodeURIComponent(slug)}`, { method: "PATCH", body: data }); }
export function deleteBlog(slug) { return request(`/api/blogs/${encodeURIComponent(slug)}`, { method: "DELETE" }); }
