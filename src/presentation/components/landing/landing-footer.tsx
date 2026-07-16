"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Reveal } from "./reveal";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Stories", href: "#cerita" },
      { label: "Scenarios", href: "#skenario" },
      { label: "How it works", href: "#cara-kerja" },
      { label: "Features", href: "#keunggulan" },
    ],
  },
  {
    title: "Actions",
    links: [
      { label: "Activate band", href: "/login" },
      { label: "Emergency lookup", href: "/lookup" },
      { label: "Sign in", href: "/login" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Privacy", href: "#" },
      { label: "Disclaimer", href: "#" },
    ],
  },
];

export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 bg-canvas">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <Reveal>
            <div>
              <Link href="/" className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                  <ShieldCheck className="h-[18px] w-[18px]" />
                </span>
                <span className="text-base font-bold tracking-tight text-slate-900">
                  RAKSA<span className="text-brand-600">-TAG</span>
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
                An NFC and QR emergency identification band. Built so families
                stay reachable in the moments that matter.
              </p>
            </div>
          </Reveal>

          {COLUMNS.map((col, i) => (
            <Reveal key={col.title} delay={(i + 1) * 80}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-slate-600 transition-colors hover:text-brand-700"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={320} className="mt-12 border-t border-slate-200/80 pt-6">
          <p className="max-w-3xl text-xs leading-relaxed text-slate-400">
            RAKSA-TAG is an emergency identification tool, not a medical device.
            Information is self-reported by the owner and is not verified by
            medical professionals. The public page only shows the data needed
            for an emergency.
          </p>
          <p className="mt-4 text-xs text-slate-400">
            © {year} RAKSA-TAG. All rights reserved.
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
