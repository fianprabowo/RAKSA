import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { ActivationFlow } from "./activation-flow";
import { ClaimActivationForm } from "./claim-activation-form";
import { AuthMedia } from "./auth-media";

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

  return (
    <div className="auth-shell">
      <main className="auth-panel">
        <div className="auth-panel__inner">
          <div className="auth-brand-row">
            <Link href="/" className="auth-brand">
              <span className="auth-brand__badge">
                <ShieldCheck size={18} strokeWidth={2.4} />
              </span>
              <span>
                RAKSA
              </span>
            </Link>
            {isAuthenticated && userEmail && (
              <span className="auth-panel__user">{userEmail}</span>
            )}
          </div>

          <div className="auth-panel__body">
            <div className="auth-intro">
              <h1 className="auth-intro__title">
                {variant === "claim-only" ? "Klaim Tag" : "Aktivasi Tag"}
              </h1>
              <p className="auth-intro__desc">
                {showClaim
                  ? "Masukkan Kode Aktivasi dari paket tag baru untuk menghubungkannya ke akun Anda."
                  : "Masuk ke akun yang sudah ada, atau daftar dengan Kode Aktivasi dari paket tag."}
              </p>
            </div>

            {showClaim && variant === "full" && (
              <ActivationSteps currentStep={2} />
            )}  

            {!showClaim && variant === "full" && (
              <ActivationFlow redirectTo={redirectTo} />
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
