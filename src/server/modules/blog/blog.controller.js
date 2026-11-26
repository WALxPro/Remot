import * as blogService from "./blog.service";
import { parseJsonBody } from "@/server/utils/request";
import {
  successResponse,
  errorResponse,
  handleError,
} from "@/server/utils/response";

// CREATE BLOG
export async function createBlog(request) {
  try {
const body = await parseJsonBody(request);
    const blog = await blogService.createBlog(body);

    return successResponse(
      "Blog created successfully",
      blog,
      201
    );
  } catch (error) {
    return handleError(error);
  }
}

// GET ALL BLOGS
export async function getBlogs(request) {
  try {
    const { searchParams } = request.nextUrl;

    const allowedParams = ["page", "limit", "search"];

    for (const param of allowedParams) {
      if (searchParams.getAll(param).length > 1) {
        return errorResponse(
          `Duplicate query parameter: ${param}`,
          400
        );
      }
    }

    const query = {
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      search: searchParams.get("search") ?? undefined,
    };

    const result = await blogService.getBlogs(query);

    return successResponse(
      "Blogs retrieved successfully",
      result
    );
  } catch (error) {
    return handleError(error);
  }
}
// GET BLOG BY SLUG
export async function getBlog(request, { params }) {
  try {
    const { slug } = await params;

    const blog = await blogService.getBlogBySlug(slug);

    if (!blog) {
      return errorResponse("Blog not found", 404);
    }

    return successResponse(
      "Blog retrieved successfully",
      blog
    );
  } catch (error) {
    return handleError(error);
  }
}

// UPDATE BLOG BY SLUG
export async function updateBlog(request, { params }) {
  try {
    const { slug } = await params;
const body = await parseJsonBody(request);
    const blog = await blogService.updateBlogBySlug(
      slug,
      body
    );

    if (!blog) {
      return errorResponse("Blog not found", 404);
    }

    return successResponse(
      "Blog updated successfully",
      blog
    );
  } catch (error) {
    return handleError(error);
  }
}

// DELETE BLOG BY SLUG
export async function deleteBlog(request, { params }) {
  try {
    const { slug } = await params;

    const blog = await blogService.deleteBlogBySlug(slug);

    if (!blog) {
      return errorResponse("Blog not found", 404);
    }

    return successResponse(
      "Blog deleted successfully",
      blog
    );
  } catch (error) {
    return handleError(error);
  }
}