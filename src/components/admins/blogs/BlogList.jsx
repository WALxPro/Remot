"use client";

import { useEffect, useState } from "react";
import { BlogSearch } from "./BlogSearch";
import { BlogTable } from "./BlogTable";
import { Pagination } from "../ui/Pagination";
import { DeleteBlogModal } from "./DeleteBlogModal";
import { PageHeader } from "@/components/admins/ui/PageHeader";
import { useBlogMutations, useBlogsQuery } from "@/hooks/useBlogQueries";


export function BlogList() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [selectedBlog, setSelectedBlog] = useState(null);

  const { data, error, isLoading, isFetching, refetch } = useBlogsQuery({ page, limit, search: debouncedSearch });
  const { remove } = useBlogMutations();
  const pagination = data?.pagination ?? { page, limit, total: 0, totalPages: 0 };

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => window.clearTimeout(timeout);
  }, [search]);

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

  async function handleConfirmDelete(blog) {
    try {
      await remove.mutateAsync(blog.slug);
      setSelectedBlog(null);
      if (data?.blogs.length === 1 && page > 1) setPage(page - 1);
    } catch {
      // The modal remains open so its error message can be displayed below.
    }
  }

  return (
    <section className="space-y-6">
      <PageHeader title="All Blogs" description="Create, edit and manage your website blogs." />

      {/* SEARCH AND FILTERS */}
      <BlogSearch
        search={search}
        limit={limit}
        onSearchChange={handleSearchChange}
        onLimitChange={handleLimitChange}
      />

      {error && <div role="alert" className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error.message}<button type="button" onClick={() => refetch()} className="ml-3 underline">Retry</button></div>}
      {isLoading && <p className="py-12 text-center text-sm text-foreground/50">Loading blogs...</p>}

      {!isLoading && <><BlogTable blogs={data?.blogs ?? []} onDelete={handleDelete} isDeleting={remove.isPending} />
      {isFetching && <p aria-live="polite" className="text-xs text-foreground/40">Refreshing blogs...</p>}

      {/* PAGINATION */}
      <Pagination
        page={pagination.page}
        limit={pagination.limit}
        total={pagination.total}
        totalPages={pagination.totalPages}
        onPageChange={setPage}
      />
      </>}

      {/* DELETE CONFIRMATION */}
      <DeleteBlogModal
        blog={selectedBlog}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        isDeleting={remove.isPending}
        error={remove.error}
      />
    </section>
  );
}
