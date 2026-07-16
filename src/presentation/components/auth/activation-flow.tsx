"use client";

import { useState } from "react";
import Link from "next/link";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { VerifyActivationCodeForm } from "./verify-activation-code-form";

interface ActivationFlowProps {
  redirectTo?: string;
}

function ActivationSteps({ currentStep }: { currentStep: 1 | 2 }) {
  const steps = [
    { number: 1, label: "Kode Aktivasi" },
    { number: 2, label: "Buat Akun" },
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

export function ActivationFlow({ redirectTo }: ActivationFlowProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [verifiedCode, setVerifiedCode] = useState<string | null>(null);

  function switchToRegister() {
    setMode("register");
    setVerifiedCode(null);
  }

  function switchToLogin() {
    setMode("login");
    setVerifiedCode(null);
  }

  return (
    <div className="auth-form">
      <div className="auth-form__tabs">
        <button
          type="button"
          className={`auth-form__tab${mode === "login" ? " auth-form__tab--active" : ""}`}
          onClick={switchToLogin}
        >
          Masuk
        </button>
        <button
          type="button"
          className={`auth-form__tab${mode === "register" ? " auth-form__tab--active" : ""}`}
          onClick={switchToRegister}
        >
          Daftar
        </button>
      </div>

      {mode === "login" && (
        <>
          <LoginForm redirectTo={redirectTo} />
          <p className="auth-form__hint">
            Belum punya akun?{" "}
            <button type="button" className="auth-link-btn" onClick={switchToRegister}>
              Daftar dengan kode aktivasi
            </button>
          </p>
        </>
      )}

      {mode === "register" && (
        <>
          <ActivationSteps currentStep={verifiedCode ? 2 : 1} />

          {!verifiedCode ? (
            <VerifyActivationCodeForm onVerified={setVerifiedCode} />
          ) : (
            <>
              <div className="auth-verified-code">
                <span className="auth-verified-code__label">Kode aktivasi terverifikasi</span>
                <code className="auth-verified-code__value">{verifiedCode}</code>
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => setVerifiedCode(null)}
                >
                  Ganti kode
                </button>
              </div>

              <RegisterForm activationCode={verifiedCode} />
            </>
          )}

          <p className="auth-form__hint">
            Sudah punya akun?{" "}
            <button type="button" className="auth-link-btn" onClick={switchToLogin}>
              Masuk di sini
            </button>
          </p>

          <p className="auth-form__footer">
            Ingin menambah gelang ke akun yang sudah ada?{" "}
            <Link href="/claim" className="auth-link">
              Klaim gelang baru
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
