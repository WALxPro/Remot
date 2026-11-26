"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineExternalLink } from "react-icons/hi";
import { ADMIN_NAVIGATION } from "@/config/admin/navigation";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        sticky top-0 hidden h-screen w-64 shrink-0
        flex-col border-r border-foreground/10
        bg-background lg:flex
      "
    >
      {/* BRAND */}
      <div className="border-b border-foreground/10 px-6 py-7">
        <Link href="/admin/blogs">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Studio Remot<span className="text-brand-primary">.</span>
          </h2>

          <p className="mt-2 text-xs text-foreground/50">
            Content Management
          </p>
        </Link>
      </div>

      {/* NAVIGATION */}
      <nav
        aria-label="Admin navigation"
        className="flex-1 space-y-2 overflow-y-auto px-4 py-6"
      >
        <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-wider text-foreground/40">
          Management
        </p>

        {ADMIN_NAVIGATION.map(({ label, href, icon: Icon }) => {
          const isActive =
            pathname === href ||
            (href === "/admin/blogs" &&
              pathname.startsWith("/admin/blogs/") &&
              pathname.endsWith("/edit"));

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`
                flex items-center gap-3 rounded-lg
                border px-3 py-3 text-sm font-medium
                transition-colors duration-200
                ${
                  isActive
                    ? "border-brand-primary/20 bg-brand-primary/10 text-brand-primary"
                    : "border-transparent text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
                }
              `}
            >
              <Icon className="shrink-0 text-xl" />

              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="border-t border-foreground/10 p-4">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-3 rounded-lg
            px-3 py-3 text-sm text-foreground/60
            transition-colors hover:bg-foreground/5
            hover:text-foreground
          "
        >
          <HiOutlineExternalLink className="shrink-0 text-xl" />

          View Website
        </Link>

        <p className="mt-4 px-3 text-xs text-foreground/30">
          Studio Remot CMS
        </p>
      </div>
    </aside>
  );
}
