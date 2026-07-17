"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ActivationFlow } from "./activation-flow";
import { ClaimActivationForm } from "./claim-activation-form";
import { AuthMedia } from "./auth-media";
import { RaksaLogo } from "@/presentation/components/brand/raksa-logo";

interface ActivationStepsProps {
  currentStep: 1 | 2 | 3;
}

function ActivationSteps({ currentStep }: ActivationStepsProps) {
  const steps = [
    { number: 1, label: "Kode Aktivasi" },
    { number: 2, label: "Masuk / Daftar" },
    { number: 3, label: "Setup Profil" },
  ] as const;

  return (
    <ol className="auth-steps">
      {steps.map((step) => (
        <li
          key={step.number}
          className={`auth-steps__item${
            step.number === currentStep
              ? " auth-steps__item--active"
              : step.number < currentStep
                ? " auth-steps__item--done"
                : ""
          }`}
        >
          <span className="auth-steps__number">{step.number}</span>
          <span className="auth-steps__label">{step.label}</span>
        </li>
      ))}
    </ol>
  );
}

function AuthBrand() {
  return (
    <Link href="/" className="auth-brand" aria-label="RAKSA">
      <RaksaLogo variant="color" height={80} />
    </Link>
  );
}

interface ActivationPageViewProps {
  isAuthenticated: boolean;
  userEmail?: string;
  redirectTo?: string;
  variant?: "full" | "claim-only";
}

export function ActivationPageView({
  isAuthenticated,
  userEmail,
  redirectTo,
  variant = "full",
}: ActivationPageViewProps) {
  const showClaim = isAuthenticated;
  // The two-step mobile flow (welcome → form) only applies to the login case.
  const twoStep = !showClaim && variant === "full";
  const [mobileStep, setMobileStep] = useState<"intro" | "form">("intro");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  function openForm(mode: "login" | "register") {
    setAuthMode(mode);
    setMobileStep("form");
  }

  // Title/description follow the chosen mode once the user is on the mobile
  // form screen; the welcome (intro) and desktop layouts keep the generic copy.
  const onMobileForm = twoStep && mobileStep === "form";
  const title = onMobileForm
    ? authMode === "login"
      ? "Login"
      : "Daftar"
    : variant === "claim-only"
      ? "Klaim Tag"
      : "Aktivasi Tag";
  const description = showClaim
    ? "Masukkan Kode Aktivasi dari paket tag baru untuk menghubungkannya ke akun Anda."
    : onMobileForm
      ? authMode === "login"
        ? "Masuk ke akun Anda untuk mengelola tag darurat."
        : "Buat akun baru dengan Kode Aktivasi dari paket tag Anda."
      : "Masuk ke akun yang sudah ada, atau daftar dengan Kode Aktivasi dari paket tag.";

  return (
    <div
      className={`auth-shell${twoStep ? " auth-shell--stepped" : ""}`}
      data-step={twoStep ? mobileStep : undefined}
    >
      <main className="auth-panel">
        <div className="auth-panel__inner">
          <div className="auth-brand-row">
            {twoStep && (
              <button
                type="button"
                className="auth-back"
                onClick={() => setMobileStep("intro")}
                aria-label="Kembali"
              >
                <ChevronLeft size={18} strokeWidth={2.4} />
              </button>
            )}
            <AuthBrand />
            {isAuthenticated && userEmail && (
              <span className="auth-panel__user">{userEmail}</span>
            )}
          </div>

          <div className="auth-panel__body">
            <div className="auth-intro">
              <h1 className="auth-intro__title">{title}</h1>
              <p className="auth-intro__desc">{description}</p>
            </div>

            {twoStep && (
              <div className="auth-intro-cta">
                <button
                  type="button"
                  className="auth-btn auth-btn--primary auth-btn--full"
                  onClick={() => openForm("login")}
                >
                  Masuk ke akun
                </button>
                <button
                  type="button"
                  className="auth-btn auth-btn--outline auth-btn--full"
                  onClick={() => openForm("register")}
                >
                  Daftar dengan Kode Aktivasi
                </button>
              </div>
            )}

            {twoStep && (
              <div className="auth-form-region">
                <ActivationFlow
                  key={authMode}
                  initialMode={authMode}
                  redirectTo={redirectTo}
                />
              </div>
            )}

            {showClaim && variant === "full" && (
              <ActivationSteps currentStep={2} />
            )}

            {showClaim && (
              <>
                <ClaimActivationForm />
                <div className="auth-card__info">
                  <h2 className="auth-card__info-title">Setelah klaim berhasil</h2>
                  <ul className="auth-card__info-list">
                    <li>Pilih mode profil (diri sendiri, anak, atau lansia)</li>
                    <li>Isi informasi darurat dan kontak keluarga</li>
                    <li>Tinjau halaman publik lalu aktifkan tag</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <AuthMedia />
    </div>
  );
}
