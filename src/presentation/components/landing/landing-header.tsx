"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, ShieldCheck, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Stories", href: "#cerita" },
  { label: "Scenarios", href: "#skenario" },
  { label: "How it works", href: "#cara-kerja" },
  { label: "FAQ", href: "#faq" },
];

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/70 bg-canvas/95 backdrop-blur-xl"
          : "border-b border-white/10 bg-[#24115d]/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_8px_20px_-8px_rgb(124_58_237_/_0.8)] transition-transform group-hover:scale-105">
            <ShieldCheck className="h-[18px] w-[18px]" />
          </span>
          <span
            className={`text-base font-bold tracking-tight transition-colors ${
              dark ? "!text-white" : "text-slate-900"
            }`}
          >
            RAKSA<span className={dark ? "!text-white" : "text-brand-600"}>-TAG</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                dark
                  ? "!text-white hover:!text-white"
                  : "text-slate-600 hover:text-brand-700"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              dark
                ? "!text-white hover:bg-white/10 hover:!text-white"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            Sign in
          </Link>
          <Link
            href="/login"
            className={`landing-sheen inline-flex h-10 items-center rounded-full px-5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
              dark
                ? "bg-white !text-slate-900 shadow-[0_12px_26px_-14px_rgb(0_0_0_/_0.7)] hover:bg-brand-50"
                : "bg-brand-600 !text-white shadow-[0_12px_26px_-12px_rgb(124_58_237_/_0.8)] hover:bg-brand-500"
            }`}
          >
            <span className="relative z-[1]">Activate band</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`rounded-xl p-2 transition-colors md:hidden ${
            dark ? "!text-white hover:bg-white/10" : "text-slate-900 hover:bg-slate-100"
          }`}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200/70 bg-canvas/95 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-full border border-slate-200 px-4 py-2.5 text-center text-sm font-medium text-slate-700"
              >
                Sign in
              </Link>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-full bg-brand-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Activate band
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
