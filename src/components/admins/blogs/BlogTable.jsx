import Link from "next/link";
import Image from "next/image";

import {
  HiOutlinePhotograph,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineExternalLink,
} from "react-icons/hi";

import { BlogStatus } from "./BlogStatus";

const TABLE_HEADERS = [
  "Blog Title",
  "Category",
  "Status",
  "Created Date",
  "Actions",
];

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function BlogTable({ blogs = [], onDelete, isDeleting = false }) {
  return (
    <div className="overflow-hidden rounded-xl border border-foreground/10">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left text-sm">
          {/* TABLE HEADER */}
          <thead className="border-b border-foreground/10 bg-foreground/5">
            <tr>
              {TABLE_HEADERS.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-foreground/50"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody className="divide-y divide-foreground/10">
            {blogs.map((blog) => (
              <tr
                key={blog.id}
                className="transition-colors hover:bg-foreground/5"
              >
                {/* BLOG TITLE */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-foreground/10 bg-foreground/5">
                      {blog.featuredImage ? (
                        <Image
                          src={blog.featuredImage}
                          alt=""
                          fill
                          sizes="56px"
                          className="size-full object-cover"
                        />
                      ) : (
                        <HiOutlinePhotograph className="text-2xl text-foreground/30" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <Link
                        href={`/admin/blogs/${blog.slug}/edit`}
                        className="block max-w-[280px] truncate font-medium text-foreground transition-colors hover:text-brand-primary"
                      >
                        {blog.title}
                      </Link>

                      <p className="mt-1 max-w-[280px] truncate text-xs text-foreground/40">
                        {blog.slug}
                      </p>
                    </div>
                  </div>
                </td>

                {/* CATEGORY */}
                <td className="px-5 py-4 text-foreground/70">
                  {blog.category}
                </td>

                {/* STATUS */}
                <td className="px-5 py-4">
                  <BlogStatus status={blog.status} />
                </td>

                {/* CREATED DATE */}
                <td className="whitespace-nowrap px-5 py-4 text-xs text-foreground/60">
                  {blog.createdAt
                    ? dateFormatter.format(new Date(blog.createdAt))
                    : "—"}
                </td>

                {/* ACTIONS */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    {blog.status === "published" && (
                      <Link
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${blog.title}`}
                        title="View blog"
                        className="rounded-lg p-2 text-foreground/50 transition-colors hover:bg-foreground/10 hover:text-foreground"
                      >
                        <HiOutlineExternalLink className="text-lg" />
                      </Link>
                    )}

                    <Link
                      href={`/admin/blogs/${blog.slug}/edit`}
                      aria-label={`Edit ${blog.title}`}
                      title="Edit blog"
                      className="rounded-lg p-2 text-foreground/50 transition-colors hover:bg-brand-primary/10 hover:text-brand-primary"
                    >
                      <HiOutlinePencil className="text-lg" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => onDelete(blog)}
                      disabled={isDeleting}
                      aria-label={`Delete ${blog.title}`}
                      title="Delete blog"
                      className="cursor-pointer rounded-lg p-2 text-foreground/50 transition-colors hover:bg-red-500/10 hover:text-red-400"
                    >
                      <HiOutlineTrash className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* EMPTY STATE */}
            {blogs.length === 0 && (
              <tr>
                <td
                  colSpan={TABLE_HEADERS.length}
                  className="px-6 py-16 text-center"
                >
                  <HiOutlinePhotograph className="mx-auto mb-4 text-4xl text-foreground/20" />

                  <h3 className="font-medium text-foreground">
                    No blogs found
                  </h3>

                  <p className="mt-2 text-xs text-foreground/50">
                    Create a blog or try a different search.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
