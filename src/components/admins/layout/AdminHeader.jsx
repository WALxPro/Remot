import Link from "next/link";
import {
  HiOutlineExternalLink,
  HiOutlinePlusCircle,
} from "react-icons/hi";

export function AdminHeader() {
  return (
    <header
      className="
        sticky top-0 z-30 flex min-h-[72px]
        items-center justify-between gap-4
        border-b border-foreground/10
        bg-background px-4 sm:px-6 lg:px-8
      "
    >
      {/* PAGE IDENTITY */}
      <div>
        <Link
          href="/admin/blogs"
          className="font-display text-lg font-bold text-foreground"
        >
          Admin Panel
        </Link>

        <p className="mt-1 text-xs text-foreground/50">
          Blog Management
        </p>
      </div>

      {/* HEADER ACTIONS */}
      <nav
        aria-label="Admin quick actions"
        className="flex items-center gap-4"
      >
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-2 text-sm
            text-foreground/60 transition-colors
            hover:text-brand-primary
          "
        >
          <HiOutlineExternalLink className="text-xl" />

          <span className="hidden sm:inline">
            View Website
          </span>

          <span className="sr-only sm:hidden">
            View Website
          </span>
        </Link>

        <Link
          href="/admin/blogs/create"
          className="
            flex items-center gap-2 rounded-lg
            bg-brand-primary/10 px-4 py-2.5
            text-sm font-medium text-brand-primary
            transition-colors hover:bg-brand-primary/20
          "
        >
          <HiOutlinePlusCircle className="text-xl" />

          Create Blog
        </Link>
      </nav>
    </header>
  );
}