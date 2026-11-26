import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi";

export function PageHeader({ title, description, backHref, backLabel = "All Blogs" }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">{title}</h1>
        {description && <p className="mt-2 text-sm text-foreground/60">{description}</p>}
      </div>
      {backHref && <Link href={backHref} className="inline-flex items-center gap-2 self-start rounded-lg border border-foreground/10 px-4 py-2.5 text-sm text-foreground/60 transition-colors hover:border-brand-primary/30 hover:text-brand-primary"><HiOutlineArrowLeft className="text-lg" />{backLabel}</Link>}
    </div>
  );
}
