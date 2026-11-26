"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blogKeys, createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from "@/lib/api/blogs";

export function useBlogsQuery(params) {
  return useQuery({ queryKey: blogKeys.list(params), queryFn: ({ signal }) => getBlogs(params, signal), placeholderData: keepPreviousData });
}

export function useBlogQuery(slug) {
  return useQuery({ queryKey: blogKeys.detail(slug), queryFn: ({ signal }) => getBlog(slug, signal), enabled: Boolean(slug) });
}

export function useBlogMutations() {
  const queryClient = useQueryClient();
  const invalidateBlogs = () => queryClient.invalidateQueries({ queryKey: blogKeys.all });
  return {
    create: useMutation({ mutationFn: createBlog, onSuccess: invalidateBlogs }),
    update: useMutation({ mutationFn: ({ slug, data }) => updateBlog(slug, data), onSuccess: (blog, { slug }) => { queryClient.removeQueries({ queryKey: blogKeys.detail(slug) }); queryClient.setQueryData(blogKeys.detail(blog.slug), blog); invalidateBlogs(); } }),
    remove: useMutation({ mutationFn: deleteBlog, onSuccess: (_, slug) => { queryClient.removeQueries({ queryKey: blogKeys.detail(slug) }); invalidateBlogs(); } }),
  };
}
