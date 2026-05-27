import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-bold tracking-wide rounded-xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.97] select-none";

  const variants: Record<Variant, string> = {
    primary:
      "bg-gradient-to-r from-teal-500 via-teal-400 to-teal-500 text-[#040a14] " +
      "shadow-[0_0_0_1px_rgba(45,212,191,0.35),0_4px_20px_rgba(45,212,191,0.2)] " +
      "hover:shadow-[0_0_0_1px_rgba(45,212,191,0.55),0_4px_28px_rgba(45,212,191,0.4)] " +
      "hover:from-teal-400 hover:via-teal-300 hover:to-teal-400",
    secondary:
      "border border-teal-400/30 bg-white/[0.04] text-[var(--foreground)] " +
      "hover:border-teal-400/55 hover:bg-white/[0.07]",
    ghost:
      "bg-transparent text-[var(--foreground)] opacity-70 hover:opacity-100 hover:bg-white/[0.06]",
    danger:
      "bg-gradient-to-r from-red-600 to-rose-500 text-white " +
      "shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_28px_rgba(239,68,68,0.38)]",
  };

  const sizes: Record<Size, string> = {
    sm: "min-h-8 px-3 py-1.5 text-xs",
    md: "min-h-10 px-4 py-2 text-sm",
    lg: "min-h-11 px-6 py-2.5 text-sm",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
