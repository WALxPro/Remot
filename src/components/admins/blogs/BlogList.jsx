"use client";

import { useState } from "react";
import { BlogSearch } from "./BlogSearch";
import { BlogTable } from "./BlogTable";
import { Pagination } from "../ui/Pagination";
import { DeleteBlogModal } from "./DeleteBlogModal";
import { MOCK_BLOGS } from "@/config/admin/blogs";


export function BlogList() {
  const [blogs, setBlogs] = useState(MOCK_BLOGS);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [selectedBlog, setSelectedBlog] = useState(null);

  const query = search.trim().toLowerCase();

  const filteredBlogs = blogs.filter((blog) =>
    [blog.title, blog.description, blog.category].some(
      (value) => value.toLowerCase().includes(query)
    )
  );

  const total = filteredBlogs.length;
  const totalPages = Math.ceil(total / limit);

  const currentPage = Math.min(
    page,
    Math.max(totalPages, 1)
  );

  const startIndex = (currentPage - 1) * limit;

  const visibleBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + limit
  );

  function handleSearchChange(value) {
    setSearch(value);
    setPage(1);
  }

  function handleLimitChange(value) {
    setLimit(value);
    setPage(1);
  }

  function handleDelete(blog) {
    setSelectedBlog(blog);
  }

  function handleCloseModal() {
    setSelectedBlog(null);
  }

  function handleConfirmDelete(blog) {
    setBlogs((previous) =>
      previous.filter((item) => item.id !== blog.id)
    );

    setPage(currentPage);
    setSelectedBlog(null);
  }

  return (
    <section className="space-y-6">
      {/* PAGE HEADING */}
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          All Blogs
        </h1>

        <p className="mt-2 text-sm text-foreground/60">
          Create, edit and manage your website blogs.
        </p>
      </div>

      {/* SEARCH AND FILTERS */}
      <BlogSearch
        search={search}
        limit={limit}
        onSearchChange={handleSearchChange}
        onLimitChange={handleLimitChange}
      />

      {/* BLOG TABLE */}
      <BlogTable
        blogs={visibleBlogs}
        onDelete={handleDelete}
      />

      {/* PAGINATION */}
      <Pagination
        page={currentPage}
        limit={limit}
        total={total}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* DELETE CONFIRMATION */}
      <DeleteBlogModal
        blog={selectedBlog}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </section>
  );
}