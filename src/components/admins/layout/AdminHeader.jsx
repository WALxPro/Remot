"use client";

import Link from "next/link";

import {
  HiOutlineExternalLink,
  HiOutlineMenu,
  HiOutlinePlusCircle,
  HiOutlineLogout,
} from "react-icons/hi";

import { ADMIN_NAVIGATION } from "@/config/admin/navigation";
import { useAuth } from "@/hooks/useAuth";

export function AdminHeader() {
  const { logout } = useAuth();

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
          <summary
            aria-label="Open admin navigation"
            className="cursor-pointer list-none rounded-lg border border-foreground/10 p-2 text-foreground/70 transition-colors hover:border-brand-primary/30 hover:text-brand-primary"
          >
            <HiOutlineMenu
              aria-hidden="true"
              className="text-xl"
            />
          </summary>

          <nav
            aria-label="Mobile admin navigation"
            className="absolute left-0 top-full z-40 mt-2 w-48 rounded-lg border border-foreground/10 bg-background p-2 shadow-xl"
          >
            {ADMIN_NAVIGATION.map(
              ({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  <Icon className="text-lg" />
                  {label}
                </Link>
              )
            )}
          </nav>
        </details>

        <Link
          href="/admin/blogs"
          className="font-display text-lg font-bold text-foreground"
        >
          Admin Panel
        </Link>

        <p className="mt-1 hidden text-xs text-foreground/50 xl:block">
          Blog Management
        </p>
      </div>

      {/* HEADER ACTIONS */}
      <nav
        aria-label="Admin quick actions"
        className="flex items-center gap-2 sm:gap-4"
      >
        {/* VIEW WEBSITE */}
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

        {/* CREATE BLOG */}
        <Link
          href="/admin/blogs/create"
          aria-label="Create Blog"
          className="
            flex items-center gap-2 rounded-lg
            bg-brand-primary/10 px-3 py-2.5
            text-sm font-medium text-brand-primary
            transition-colors hover:bg-brand-primary/20
            sm:px-4
          "
        >
          <HiOutlinePlusCircle className="text-xl" />

          <span className="hidden sm:inline">
            Create Blog
          </span>
        </Link>

        {/* LOGOUT */}
        <div className="relative">
          <button
            type="button"
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
            aria-label={
              logout.isPending ? "Logging out" : "Logout"
            }
            aria-busy={logout.isPending}
            className="
              flex cursor-pointer items-center gap-2
              rounded-lg border border-red-500/20
              bg-red-500/5 px-3 py-2.5
              text-sm font-medium text-red-400
              transition-colors hover:bg-red-500/10
              disabled:cursor-not-allowed
              disabled:opacity-50
              sm:px-4
            "
          >
            <HiOutlineLogout className="text-xl" />

            <span className="hidden sm:inline">
              {logout.isPending
                ? "Logging out..."
                : "Logout"}
            </span>
          </button>

          {/* LOGOUT ERROR */}
          {logout.isError && (
            <div
              role="alert"
              className="
                absolute right-0 top-full mt-3
                w-64 rounded-lg border border-red-500/20
                bg-background p-3 text-xs text-red-400
                shadow-xl
              "
            >
              {logout.error.message}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}