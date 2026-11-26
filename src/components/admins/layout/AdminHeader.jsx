import Link from "next/link";
import {
  HiOutlineExternalLink,
  HiOutlineMenu,
  HiOutlinePlusCircle,
} from "react-icons/hi";
import { ADMIN_NAVIGATION } from "@/config/admin/navigation";

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
      <div className="flex items-center gap-3">
        <details className="relative lg:hidden">
          <summary aria-label="Open admin navigation" className="cursor-pointer list-none rounded-lg border border-foreground/10 p-2 text-foreground/70 transition-colors hover:border-brand-primary/30 hover:text-brand-primary">
            <HiOutlineMenu aria-hidden="true" className="text-xl" />
          </summary>
          <nav aria-label="Mobile admin navigation" className="absolute left-0 top-full z-40 mt-2 w-48 rounded-lg border border-foreground/10 bg-background p-2 shadow-xl">
            {ADMIN_NAVIGATION.map(({ label, href, icon: Icon }) => (
              <Link key={href} href={href} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground">
                <Icon className="text-lg" />
                {label}
              </Link>
            ))}
          </nav>
        </details>
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
