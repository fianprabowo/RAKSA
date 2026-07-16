"use client";

import { useEffect, useRef, useState } from "react";
import { Check, HeartPulse, PhoneCall, UserRound, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./reveal";

type UseCaseId = "adult" | "child" | "elderly";

interface UseCase {
  id: UseCaseId;
  tab: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: string;
  chip: string;
  features: string[];
  icon: LucideIcon;
}

const USE_CASES: UseCase[] = [
  {
    id: "adult",
    tab: "Medical Emergency",
    eyebrow: "Adults · self-managed",
    title: "Helpers know exactly what to do.",
    description:
      "If you collapse or have an accident, a helper simply taps or scans the band to see your allergies, critical conditions, and call your emergency contact. No need to unlock your phone.",
    primaryAction: "Primary action: Call emergency contact & 112",
    chip: "TAP / SCAN IN EMERGENCY",
    features: [
      "Allergies and critical conditions shown first",
      "One-tap call to emergency contact & 112",
      "No need to unlock the person's phone",
      "Every scan is logged for you to review",
    ],
    icon: HeartPulse,
  },
  {
    id: "child",
    tab: "Lost Child",
    eyebrow: "Children · parent-managed",
    title: "Child separated in a crowd? Guardians reached instantly.",
    description:
      "At a mall, airport, or festival, staff and kind strangers can scan a child's band to call the guardian right away, even if the child doesn't know anyone's number.",
    primaryAction: "Primary action: Call Parent / Guardian",
    chip: "SCAN IF LOST",
    features: [
      "A clear 'lost child' message for helpers",
      "Call Parent / Guardian is the top button",
      "Share location with family from the helper's phone",
      "Instant notification to parents when scanned",
    ],
    icon: Users,
  },
  {
    id: "elderly",
    tab: "Elderly",
    eyebrow: "Elderly · family-managed",
    title: "Disoriented or lost? Family is one tap away.",
    description:
      "For elderly people with disorientation or Alzheimer's, the band helps people nearby reach family and gives them the context they need to help calmly.",
    primaryAction: "Primary action: Call Family",
    chip: "SCAN TO CALL FAMILY",
    features: [
      "Notes on disorientation & cognitive condition",
      "Call family / primary caregiver button",
      "Critical medical info in case of collapse",
      "Managed by adult children from one family account",
    ],
    icon: UserRound,
  },
];

export function LandingUseCases() {
  const [active, setActive] = useState<UseCaseId>("adult");
  const [paused, setPaused] = useState(false);
  const current = USE_CASES.find((uc) => uc.id === active) ?? USE_CASES[0];
  const Icon = current.icon;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setActive((prev) => {
        const idx = USE_CASES.findIndex((u) => u.id === prev);
        return USE_CASES[(idx + 1) % USE_CASES.length].id;
      });
    }, 5000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  return (
    <section className="bg-white py-20 sm:py-28" id="skenario">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-brand-600">One band, many situations</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Built for the moments that matter most.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            From one family account, you can set up bands for yourself, your
            kids, and your parents. Each situation puts the most important
            action right at the top.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-10 flex flex-wrap justify-center gap-2">
          {USE_CASES.map((uc) => {
            const selected = active === uc.id;
            const TabIcon = uc.icon;
            return (
              <button
                key={uc.id}
                type="button"
                onClick={() => {
                  setActive(uc.id);
                  setPaused(true);
                }}
                aria-pressed={selected}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                  selected
                    ? "bg-brand-600 text-white shadow-[0_12px_22px_-10px_rgb(124_58_237_/_0.7)]"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:text-brand-700"
                }`}
              >
                <TabIcon className="h-4 w-4" />
                {uc.tab}
              </button>
            );
          })}
        </Reveal>

        <Reveal delay={160}>
          <div
            key={current.id}
            className="landing-fade-up mt-8 grid gap-6 rounded-[var(--radius-card)] border border-slate-200/80 bg-canvas p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:grid-cols-[1.1fr_1fr]"
            onMouseEnter={() => setPaused(true)}
          >
          <div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[var(--shadow-soft)]">
              <Icon className="h-6 w-6" />
            </span>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-600">
              {current.eyebrow}
            </p>
            <h3 className="mt-2 text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
              {current.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {current.description}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-50 px-3.5 py-2.5 text-sm font-semibold text-brand-700">
              <PhoneCall className="h-4 w-4" />
              {current.primaryAction}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-5 rounded-2xl bg-white p-5">
            <ul className="space-y-2.5">
              {current.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between rounded-xl border border-dashed border-slate-300 bg-canvas px-4 py-3">
              <span className="text-xs text-slate-500">Text on the band</span>
              <span className="rounded-md bg-slate-900 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide text-white">
                {current.chip}
              </span>
            </div>
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
