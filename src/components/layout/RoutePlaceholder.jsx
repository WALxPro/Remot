export function RoutePlaceholder({ title }) {
  return (
    <section className="flex min-h-[65vh] flex-col items-center justify-center bg-background px-6 pb-16 pt-36 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-primary">
        Studio Remot
      </p>
      <h1 className="mt-4 text-4xl font-semibold uppercase md:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-xl text-base text-foreground/75 md:text-lg">
        This page is coming soon.
      </p>
    </section>
  );
}
