"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";

import { NAVBAR } from "@/config/navigation";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { ServicesMegaMenu } from "./ServicesMegaMenu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);

  const headerRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);
  const servicesButtonRef = useRef(null);

  const closeMenu = () => setIsMenuOpen(false);
  const closeMega = () => setIsMegaOpen(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (!isMenuOpen && !isMegaOpen) return;

        event.preventDefault();
        setIsMegaOpen(false);
        setIsMenuOpen(false);
        if (isMenuOpen) {
          mobileMenuButtonRef.current?.focus();
        } else {
          servicesButtonRef.current?.focus();
        }
      }
    };

    const handlePointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMegaOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen, isMegaOpen]);

  return (
    <header
      ref={headerRef}
      className="absolute inset-x-0 top-0 z-50"
      onMouseLeave={closeMega}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          closeMega();
        }
      }}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 md:px-8 md:py-10">
        {/* LOGO */}
        <Link
          href={NAVBAR.brand.href}
          onMouseEnter={closeMega}
          onClick={() => {
            closeMega();
            closeMenu();
          }}
        >
          <Image
            src={NAVBAR.brand.src}
            alt={NAVBAR.brand.alt}
            width={195}
            height={57}
            priority
            className="h-auto w-[140px] lg:w-[195px]"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <ul className="hidden items-center gap-[60px] lg:flex">
          {NAVBAR.links.map((item) => (
            <li key={item.href}>
              {item.megaMenu ? (
                <button
                  ref={servicesButtonRef}
                  type="button"
                  aria-expanded={isMegaOpen}
                  aria-controls="services-mega-menu"
                  onMouseEnter={() => setIsMegaOpen(true)}
                  onClick={() => setIsMegaOpen((prev) => !prev)}
                  className={`
                    flex cursor-pointer items-center gap-1
                    text-base transition-colors
                    ${
                      isMegaOpen
                        ? "text-brand-primary"
                        : "text-foreground hover:text-brand-primary"
                    }
                  `}
                >
                  {item.label}

                  <HiChevronDown
                    className={`
                      text-lg transition-transform duration-200
                      ${isMegaOpen ? "rotate-180" : ""}
                    `}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  onMouseEnter={closeMega}
                  onFocus={closeMega}
                  onClick={closeMega}
                  className="text-base text-foreground transition hover:text-brand-primary"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* CONTACT BUTTON */}
        <div className="hidden lg:block" onMouseEnter={closeMega}>
          <Button href="/contact">Contact us</Button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          ref={mobileMenuButtonRef}
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => {
            setIsMenuOpen((prev) => !prev);
            closeMega();
          }}
          className="flex cursor-pointer items-center justify-center text-3xl text-foreground lg:hidden"
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {/* DESKTOP MEGA MENU */}
      {isMegaOpen && (
        <div className="hidden lg:block">
          <ServicesMegaMenu onClose={closeMega} />
        </div>
      )}

      {/* MOBILE NAVIGATION */}
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
}
