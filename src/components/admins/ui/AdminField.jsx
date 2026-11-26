const baseInputClassName =
  "w-full rounded-lg border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground outline-none placeholder:text-foreground/40 transition-colors focus:border-brand-primary/50";

export function AdminField({ label, htmlFor, hint, error, children, className = "" }) {
  const descriptionId = error ? `${htmlFor}-error` : undefined;
  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">{label}</label>}
      {children}
      {error && <p id={descriptionId} role="alert" className="text-xs text-red-400">{error}</p>}
      {hint && <p className="text-xs text-foreground/40">{hint}</p>}
    </div>
  );
}

export function AdminInput({ className = "", "aria-invalid": invalid, ...props }) {
  return <input {...props} aria-invalid={invalid} className={`${baseInputClassName} ${invalid ? "border-red-400/70" : ""} ${className}`} />;
}

export function AdminTextarea({ className = "", "aria-invalid": invalid, ...props }) {
  return <textarea {...props} aria-invalid={invalid} className={`${baseInputClassName} ${invalid ? "border-red-400/70" : ""} ${className}`} />;
}

export function CharacterCounter({ value = "", recommendedLength }) {
  return <span className={`text-xs ${value.length > recommendedLength ? "text-amber-400" : "text-foreground/40"}`}>{value.length}/{recommendedLength}</span>;
}
