import {
  getBlogs,
  createBlog,
} from "@/server/modules/blog/blog.controller";

export const runtime = "nodejs";

export { getBlogs as GET, createBlog as POST };