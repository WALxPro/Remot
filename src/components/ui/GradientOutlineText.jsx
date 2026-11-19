
export function GradientOutlineText({
  children,
  className = "",
  strokeColor = "transparent",
}) {
  return (
    <span
      className={`text-white ${className}`}
      style={{
        WebkitTextStroke: `1px ${strokeColor}`,
        paintOrder: "stroke fill",
      }}
    >
      {children}
    </span>
  );
}
