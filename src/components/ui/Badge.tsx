import { HTMLAttributes } from "react";

type Variant = "default" | "outline" | "gold";

export function Badge({
  className = "",
  variant = "default",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  const variants: Record<Variant, string> = {
    default: "border border-teal-400/25 bg-teal-400/10 text-teal-600 dark:text-teal-300",
    outline: "border border-white/15 bg-white/[0.04] text-[var(--muted)]",
    gold: "border border-teal-400/40 bg-gradient-to-r from-teal-500/15 to-teal-400/10 text-teal-600 dark:text-teal-300",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
