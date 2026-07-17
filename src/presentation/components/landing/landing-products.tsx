"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { MessageCircle, Sparkles, X, ZoomIn } from "lucide-react";
import { Reveal } from "./reveal";

const WHATSAPP_NUMBER = "6283164212564";

type ProductId = "bracelet" | "keychain" | "necklace" | "custom";

interface Product {
  id: ProductId;
  name: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image?: string;
  imageAlt?: string;
  custom?: boolean;
}

function whatsappBuyUrl(productName: string) {
  const message = [
    "Hi raksa!",
    "",
    `I'm interested in buying *${productName}*.`,
    "",
    "Could you share availability, pricing, and how to order?",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function whatsappCustomUrl() {
  const message = [
    "Hi raksa!",
    "",
    "I'd like a *custom* NFC tag (shape / color / branding).",
    "",
    "What I need:",
    "- Shape:",
    "- Color:",
    "- Quantity:",
    "- Notes:",
    "",
    "Looking forward to your help.",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const PRODUCTS: Product[] = [
  {
    id: "bracelet",
    name: "Bracelet",
    subtitle: "Everyday wear",
    description:
      "Black cord bracelet with a round NFC disc — comfortable for daily wear and easy to tap in an emergency.",
    highlights: ["NFC + QR ready", "Comfortable all-day fit", "Discrete matte tag"],
    image: "/products/bracelet.png",
    imageAlt: "raksa NFC bracelet on wood surface",
  },
  {
    id: "keychain",
    name: "Keychain",
    subtitle: "On your keys",
    description:
      "Matte black NFC key fob — clip it to keys or a bag so it’s always ready to scan.",
    highlights: ["Durable ABS shell", "Fits any keyring", "Fast tap access"],
    image: "/products/keychain.png",
    imageAlt: "raksa NFC keychain fob",
  },
  {
    id: "necklace",
    name: "Necklace",
    subtitle: "Discrete pendant",
    description:
      "Thin silver chain with a minimal NFC pendant — looks like jewelry, works like an emergency tag.",
    highlights: ["Minimal pendant", "Light chain", "Tap or scan ready"],
    image: "/products/necklace.png",
    imageAlt: "raksa NFC necklace pendant",
  },
];

function WhatsAppButton({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`landing-sheen inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-600 px-5 text-sm font-semibold !text-white shadow-[0_14px_30px_-12px_rgb(124_58_237_/_0.7)] transition-all hover:-translate-y-0.5 hover:bg-brand-500 hover:!text-white ${className}`}
    >
      <span className="relative z-[1] inline-flex items-center gap-2 !text-white [&_svg]:!text-white">
        <MessageCircle className="h-4 w-4" />
        {label}
      </span>
    </a>
  );
}

function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const titleId = useId();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  const buyHref = product.custom
    ? whatsappCustomUrl()
    : whatsappBuyUrl(`raksa ${product.name}`);

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
        aria-label="Close product preview"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[1.75rem] border border-slate-200 bg-white shadow-[var(--shadow-float)] sm:rounded-[1.75rem]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-white/90 p-2 text-slate-500 shadow-sm transition-colors hover:bg-white hover:text-slate-800"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative flex min-h-[240px] items-center justify-center bg-[#d8cfc3] p-6 sm:min-h-[320px] sm:p-8">
            {product.image ? (
              <div className="relative h-full min-h-[220px] w-full sm:min-h-[300px]">
                <Image
                  src={product.image}
                  alt={product.imageAlt ?? product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="flex h-48 w-48 items-center justify-center rounded-[2rem] bg-brand-100 text-brand-700">
                <Sparkles className="h-12 w-12" />
              </div>
            )}
          </div>

          <div className="flex flex-col p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              {product.subtitle}
            </p>
            <h3
              id={titleId}
              className="mt-1 text-2xl font-bold tracking-tight text-slate-900"
            >
              raksa {product.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {product.description}
            </p>

            <ul className="mt-5 space-y-2">
              {product.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm font-medium text-slate-700"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:mt-auto sm:pt-8">
              <WhatsAppButton
                href={buyHref}
                label={product.custom ? "Custom via WhatsApp" : "Buy via WhatsApp"}
                className="w-full"
              />
              <button
                type="button"
                onClick={onClose}
                className="h-11 rounded-full border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function LandingProducts() {
  const [activeId, setActiveId] = useState<ProductId | null>(null);
  const activeProduct =
    activeId === "custom"
      ? ({
          id: "custom",
          name: "Custom",
          subtitle: "Made to order",
          description:
            "Need a different shape, color, or brand mark? Tell us what you need and we’ll craft an NFC tag that fits your community, event, or family.",
          highlights: [
            "Custom shape & color",
            "Optional logo / branding",
            "Bulk orders welcome",
          ],
          custom: true,
        } satisfies Product)
      : PRODUCTS.find((p) => p.id === activeId) ?? null;

  return (
    <section className="bg-canvas py-20 sm:py-28" id="produk">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-brand-600">Products</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Pick the form that fits you
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Every tag includes NFC, QR, and an Emergency ID. Choose the form factor
            you&apos;ll actually wear — or request a custom build.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.id} delay={i * 80}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-pop)]">
                <button
                  type="button"
                  onClick={() => setActiveId(product.id)}
                  className="relative aspect-square w-full overflow-hidden bg-[#d8cfc3] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
                  aria-label={`View ${product.name} details`}
                >
                  <Image
                    src={product.image!}
                    alt={product.imageAlt!}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.04] sm:p-6"
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
                    <ZoomIn className="h-3.5 w-3.5" />
                    Preview
                  </span>
                </button>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                    {product.subtitle}
                  </p>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
                    {product.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {product.description}
                  </p>
                  <div className="mt-5 flex flex-col gap-2.5">
                    <WhatsAppButton
                      href={whatsappBuyUrl(`raksa ${product.name}`)}
                      label="Buy via WhatsApp"
                      className="w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setActiveId(product.id)}
                      className="h-10 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                    >
                      View details
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240} className="mt-6">
          <article className="overflow-hidden rounded-[1.5rem] border border-dashed border-brand-300/80 bg-gradient-to-br from-brand-50 via-white to-white p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:flex lg:items-center lg:gap-10">
            <button
              type="button"
              onClick={() => setActiveId("custom")}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-brand-700 transition-transform hover:scale-105"
              aria-label="View custom order details"
            >
              <Sparkles className="h-6 w-6" />
            </button>
            <div className="mt-4 flex-1 lg:mt-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Custom order
              </p>
              <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Need a custom shape, color, or brand?
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                We can tailor NFC tags for communities, events, or families — from
                form factor to logo. Tell us what you need on WhatsApp.
              </p>
            </div>
            <div className="mt-5 flex shrink-0 flex-col gap-2 sm:flex-row lg:mt-0 lg:flex-col">
              <WhatsAppButton href={whatsappCustomUrl()} label="Custom via WhatsApp" />
              <button
                type="button"
                onClick={() => setActiveId("custom")}
                className="h-11 rounded-full border border-brand-200 bg-white px-5 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-50"
              >
                View details
              </button>
            </div>
          </article>
        </Reveal>
      </div>

      {activeProduct && (
        <ProductModal product={activeProduct} onClose={() => setActiveId(null)} />
      )}
    </section>
  );
}
