
import Link from "next/link";
import { NAVBAR } from "@/config/navigation";
import { Button } from "@/components/ui/Button";

export function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      id="mobile-navigation"
      className="absolute left-0 top-full w-full bg-brand-purple px-6 py-6 shadow-lg lg:hidden"
    >
      <ul className="flex flex-col gap-6">
        {NAVBAR.links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={onClose}
              className="block text-base text-foreground transition hover:text-brand-primary"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button href="/contact">Contact us</Button>
      </div>
    </div>
  );
}
