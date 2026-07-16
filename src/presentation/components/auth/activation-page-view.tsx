import Link from "next/link";
import { ActivationFlow } from "./activation-flow";
import { ClaimActivationForm } from "./claim-activation-form";

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
    <div className="auth-page">
      <header className="auth-page__header">
        <Link href="/" className="auth-page__logo">
          GelangSiaga
        </Link>
        {isAuthenticated && userEmail && (
          <span className="auth-page__user">{userEmail}</span>
        )}
      </header>

      <main className="auth-page__main">
        <div className="auth-card">
          <div className="auth-card__intro">
            <h1 className="auth-card__title">
              {variant === "claim-only" ? "Klaim Gelang" : "Aktivasi Gelang"}
            </h1>
            <p className="auth-card__desc">
              {showClaim
                ? "Masukkan Kode Aktivasi dari paket gelang baru untuk menghubungkannya ke akun Anda."
                : "Masuk ke akun yang sudah ada, atau daftar dengan Kode Aktivasi dari paket gelang."}
            </p>
          </div>

          {showClaim && variant === "full" && <ActivationSteps currentStep={2} />}

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
                  <li>Tinjau halaman publik lalu aktifkan gelang</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
