
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  HiArrowRight,
  HiOutlineSearch,
  HiX,
} from "react-icons/hi";

import { HiArrowUpRight } from "react-icons/hi2";

import { SERVICE_MEGA_MENU } from "@/config/navigation";

export function ServicesMegaMenu({ onClose }) {
  const [activeId, setActiveId] = useState(
    SERVICE_MEGA_MENU[0]?.id ?? null
  );
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    if (!query) return SERVICE_MEGA_MENU;

    return SERVICE_MEGA_MENU.filter(
      (category) =>
        category.title.toLowerCase().includes(query) ||
        category.items.some((service) =>
          service.label.toLowerCase().includes(query)
        )
    );
  }, [query]);

  const activeCategory =
    filteredCategories.find(
      (category) => category.id === activeId
    ) ?? filteredCategories[0];

  const visibleServices = activeCategory
    ? activeCategory.items.filter((service) => {
        if (!query) return true;

        if (
          activeCategory.title.toLowerCase().includes(query)
        ) {
          return true;
        }

        return service.label.toLowerCase().includes(query);
      })
    : [];

  return (
    <div
      id="services-mega-menu"
      className="
        absolute inset-x-0 top-full z-50
        border-t border-white/10 bg-[#100719]
        shadow-[0_25px_60px_rgba(0,0,0,0.45)]
      "
    >
      <div className="mx-auto max-w-7xl px-8 py-8">

        {/* TOP BAR */}
        <div className="mb-7 flex items-center justify-between gap-6">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand-primary">
              Studio Remot
            </span>

            <h2 className="mt-2 font-display text-[28px] font-semibold text-foreground">
              Explore what we do.
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/services"
              onClick={onClose}
              className="flex items-center gap-2 text-sm font-medium text-brand-primary hover:text-foreground"
            >
              All Services
              <HiArrowUpRight className="text-lg" />
            </Link>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close mega menu"
              className="text-xl text-foreground/50 transition hover:text-foreground"
            >
              <HiX />
            </button>
          </div>
        </div>

        {/* SEARCH */}
        <div className="mb-7 flex items-center gap-3 rounded-xl border border-white/10 bg-foreground/5 px-4 py-3">
          <HiOutlineSearch className="text-xl text-foreground/50" />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="What service are you looking for?"
            aria-label="Search services"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="text-foreground/50 hover:text-foreground"
            >
              <HiX />
            </button>
          )}
        </div>

        {/* MENU BODY */}
        <div className="grid h-[min(55vh,480px)] grid-cols-[30%_70%] overflow-hidden rounded-xl border border-white/10">

          {/* LEFT CATEGORIES */}
          <div className="no-scrollbar overflow-y-auto border-r border-white/10 py-4">
            <p className="mb-3 px-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground/40">
              Service Categories
            </p>

            {filteredCategories.map((category) => {
              const isActive =
                activeCategory?.id === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onMouseEnter={() =>
                    setActiveId(category.id)
                  }
                  onFocus={() =>
                    setActiveId(category.id)
                  }
                  onClick={() =>
                    setActiveId(category.id)
                  }
                  aria-pressed={isActive}
                  className={`
                    flex w-full cursor-pointer items-center
                    justify-between gap-3 px-5 py-3
                    text-left text-[13px] transition-colors
                    ${
                      isActive
                        ? "bg-brand-primary/10 text-brand-primary"
                        : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                    }
                  `}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[10px] text-foreground/30">
                      {String(
                        SERVICE_MEGA_MENU.findIndex(
                          (item) => item.id === category.id
                        ) + 1
                      ).padStart(2, "0")}
                    </span>

                    {category.title}
                  </span>

                  {isActive && (
                    <HiArrowRight className="shrink-0" />
                  )}
                </button>
              );
            })}

            {filteredCategories.length === 0 && (
              <p className="px-5 py-5 text-sm text-foreground/50">
                No matching categories.
              </p>
            )}
          </div>

          {/* RIGHT SERVICES */}
          <div className="no-scrollbar overflow-y-auto p-8">
            {activeCategory ? (
              <>
                <div className="mb-7">
                  <span className="text-xs uppercase tracking-[0.2em] text-brand-primary">
                    Creative Services
                  </span>

                  <h3 className="mt-3 font-display text-[26px] font-semibold leading-tight text-foreground">
                    {activeCategory.title}
                  </h3>

                  <p className="mt-2 text-sm text-foreground/50">
                    Explore creative solutions tailored to your project.
                  </p>
                </div>

                {/* SERVICE CARDS */}
                <div className="grid grid-cols-2 gap-3">
                  {visibleServices.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={onClose}
                      className="
                        group flex min-h-[68px]
                        items-center justify-between
                        gap-3 rounded-lg border
                        border-white/10 bg-foreground/5
                        px-4 py-3
                        transition-all duration-200
                        hover:border-brand-primary/50
                        hover:bg-brand-primary/10
                      "
                    >
                      <span className="text-[13px] leading-snug text-foreground/80 transition group-hover:text-foreground">
                        {service.label}
                      </span>

                      <HiArrowUpRight className="shrink-0 text-lg text-brand-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>

                <Link
                  href={activeCategory.href}
                  onClick={onClose}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:text-foreground"
                >
                  Explore {activeCategory.title}
                  <HiArrowRight />
                </Link>
              </>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-foreground/50">
                No services found.
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs text-foreground/40">
            One creative team. Endless possibilities.
          </p>

          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-medium text-brand-primary hover:text-foreground"
          >
            Have a project in mind?
            <HiArrowUpRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
