import {
  getBlog,
  updateBlog,
  deleteBlog,
} from "@/server/modules/blog/blog.controller";

export const runtime = "nodejs";

export {
  getBlog as GET,
  updateBlog as PATCH,
  deleteBlog as DELETE,
};