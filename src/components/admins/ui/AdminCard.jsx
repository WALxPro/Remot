export function AdminCard({ children, className = "" }) {
  return (
    <section
      className={`rounded-xl border border-foreground/10 p-5 sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}
