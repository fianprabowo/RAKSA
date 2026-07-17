import Image from "next/image";

type Variant = "color" | "white";

const SOURCES: Record<Variant, { src: string; width: number; height: number }> = {
  color: { src: "/raksa-logo.png", width: 736, height: 339 },
  white: { src: "/raksa-logo-white.png", width: 707, height: 353 },
};

/**
 * RAKSA wordmark. Use `variant="color"` on light surfaces and `variant="white"`
 * on dark/violet surfaces. Sizing is driven by the `height` prop (px) so it
 * works both inside Tailwind areas and the plain-CSS auth pages.
 */
export function RaksaLogo({
  variant = "color",
  height = 28,
  className,
  priority = false,
}: {
  variant?: Variant;
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const { src, width, height: h } = SOURCES[variant];
  return (
    <Image
      src={src}
      alt="RAKSA"
      width={width}
      height={h}
      priority={priority}
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
