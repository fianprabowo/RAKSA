import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "onDark" | "solidDark" | "ghostLight" | "outlineDark";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 focus-visible:ring-offset-2 active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary:
    "landing-sheen bg-brand-600 text-white shadow-[0_14px_30px_-12px_rgb(124_58_237_/_0.7)] hover:-translate-y-0.5 hover:bg-brand-500",
  onDark:
    "landing-sheen bg-white !text-slate-900 shadow-[0_14px_30px_-14px_rgb(0_0_0_/_0.5)] hover:-translate-y-0.5 hover:bg-brand-50 [&_svg]:!text-slate-900",
  solidDark:
    "landing-sheen bg-slate-900 text-white ring-1 ring-white/15 shadow-[0_16px_34px_-14px_rgb(0_0_0_/_0.75)] hover:-translate-y-0.5 hover:bg-slate-800",
  ghostLight:
    "border border-[rgb(15_23_42_/_0.12)] bg-white/70 text-slate-800 backdrop-blur hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700 hover:bg-white",
  outlineDark:
    "border border-white/25 bg-white/5 text-white backdrop-blur hover:-translate-y-0.5 hover:bg-white/12",
};

const sizes: Record<Size, string> = {
  sm: "h-9 rounded-full px-4 text-sm",
  md: "h-11 rounded-full px-5 text-sm",
  lg: "h-12 rounded-full px-6 text-sm sm:h-13 sm:px-7 sm:text-base",
};

export function LandingLinkButton({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  const innerClass =
    variant === "onDark"
      ? "relative z-[1] inline-flex items-center gap-2 !text-slate-900"
      : "relative z-[1] inline-flex items-center gap-2";

  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <span className={innerClass}>{children}</span>
    </Link>
  );
}
