
import Link from "next/link";

const ITEM_CLASS =
  "text-base leading-5 text-foreground transition-colors duration-300 hover:text-brand-primary sm:text-sm";

export function FooterColumn({ title, items }) {
  return (
    <div>
      <h3 className="text-[24px] font-normal font-sans text-foreground">
        {title}
      </h3>

      <ul className="mt-3 flex flex-col gap-2">
        {items.map(({ label, href }) => (
          <li key={label}>
            {href ? (
              <Link href={href} className={ITEM_CLASS}>
                {label}
              </Link>
            ) : (
              <span className="text-base leading-5 text-foreground">
                {label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
