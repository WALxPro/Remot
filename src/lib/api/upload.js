import { request } from "./request";

export function uploadBlogImage(file, signal) {
  const body = new FormData();
  body.append("file", file);
  return request("/api/upload", { method: "POST", body, signal });
}
