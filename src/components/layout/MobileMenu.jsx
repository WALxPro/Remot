
"use client";

import { useState } from "react";
import Link from "next/link";
import { HiChevronDown } from "react-icons/hi";

import {
  NAVBAR,
  SERVICE_MEGA_MENU,
} from "@/config/navigation";

export function MobileMenu({ isOpen, onClose }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleClose = () => {
    setServicesOpen(false);
    setActiveCategory(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="mobile-navigation"
      className="
        absolute inset-x-0 top-full z-50
        max-h-[calc(100dvh-90px)]
        overflow-y-auto
        border-t border-white/10
        bg-[#100719]
        px-5 py-6
        lg:hidden
      "
    >
      <ul className="flex flex-col gap-2">
        {NAVBAR.links.map((item) => (
          <li
            key={item.href}
            className="border-b border-white/10 pb-2"
          >
            {item.megaMenu ? (
              <>
                {/* SERVICES TOGGLE */}
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  onClick={() =>
                    setServicesOpen((prev) => !prev)
                  }
                  className="
                    flex w-full cursor-pointer
                    items-center justify-between
                    py-3 text-left text-base text-white
                  "
                >
                  {item.label}

                  <HiChevronDown
                    className={`transition-transform duration-200 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* SERVICES ACCORDION */}
                {servicesOpen && (
                  <div className="pb-4 pl-3">
                    <Link
                      href="/services"
                      onClick={handleClose}
                      className="mb-3 block text-sm text-brand-primary"
                    >
                      View All Services
                    </Link>

                    {SERVICE_MEGA_MENU.map((category) => {
                      const isActive =
                        activeCategory === category.id;

                      return (
                        <div
                          key={category.id}
                          className="border-b border-white/5"
                        >
                          {/* CATEGORY TOGGLE */}
                          <button
                            type="button"
                            aria-expanded={isActive}
                            onClick={() =>
                              setActiveCategory(
                                isActive
                                  ? null
                                  : category.id
                              )
                            }
                            className={`
                              flex w-full cursor-pointer
                              items-center justify-between
                              gap-3 py-3 text-left
                              text-sm font-medium
                              transition-colors
                              ${
                                isActive
                                  ? "text-brand-primary"
                                  : "text-white"
                              }
                            `}
                          >
                            <span>{category.title}</span>

                            <HiChevronDown
                              className={`shrink-0 transition-transform duration-200 ${
                                isActive
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>

                          {/* SUBSERVICES */}
                          {isActive && (
                            <ul className="space-y-3 pb-5 pl-4">
                              <li>
                                <Link
                                  href={category.href}
                                  onClick={handleClose}
                                  className="text-sm font-medium text-brand-primary"
                                >
                                  Explore Category
                                </Link>
                              </li>

                              {category.items.map(
                                (service) => (
                                  <li key={service.href}>
                                    <Link
                                      href={service.href}
                                      onClick={handleClose}
                                      className="
                                        block text-[13px]
                                        leading-relaxed
                                        text-white/65
                                        transition-colors
                                        hover:text-brand-primary
                                      "
                                    >
                                      {service.label}
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                onClick={handleClose}
                className="
                  block py-3 text-base text-white
                  transition hover:text-brand-primary
                "
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* MOBILE CTA */}
      <Link
        href="/contact"
        onClick={handleClose}
        className="
          bg-brand-gradient mt-6
          flex min-h-12 items-center
          justify-center rounded-lg
          px-5 text-white
        "
      >
        Contact us
      </Link>
    </div>
  );
}
