
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import { NAVBAR } from "@/config/navigation";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="absolute inset-x-0 top-0 z-20">
<nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 md:px-8 md:py-10">        <Link href={NAVBAR.brand.href}>
          <Image
            src={NAVBAR.brand.src}
            alt={NAVBAR.brand.alt}
            width={195}
            height={57}
            priority
            className="h-auto w-[140px] lg:w-[195px]"
          />
        </Link>
        <ul className="hidden items-center gap-[60px] lg:flex">
          {NAVBAR.links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-base text-foreground transition hover:text-brand-primary"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden lg:block">
          <Button href="/contact">Contact us</Button>
        </div>
        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-center text-3xl text-foreground lg:hidden"
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
      />
    </header>
  );
}
