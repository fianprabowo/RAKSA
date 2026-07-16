"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signInAction, type ActionResult } from "@/app/(auth)/actions";

const initialState: ActionResult = {};

interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(signInAction, initialState);

  return (
    <form action={formAction} className="auth-form__body">
      {redirectTo && <input type="hidden" name="redirect" value={redirectTo} />}

      <div className="auth-field">
        <label htmlFor="loginEmail" className="auth-field__label">
          Email
        </label>
        <input
          id="loginEmail"
          name="email"
          type="email"
          autoComplete="email"
          className="auth-field__input"
          placeholder="nama@email.com"
          required
        />
      </div>

      <div className="auth-field">
        <label htmlFor="loginPassword" className="auth-field__label">
          Kata Sandi
        </label>
        <input
          id="loginPassword"
          name="password"
          type="password"
          autoComplete="current-password"
          className="auth-field__input"
          placeholder="Kata sandi Anda"
          required
        />
      </div>

      {state.error && (
        <p className="auth-form__error" role="alert">
          {state.error}
        </p>
      )}

      <button type="submit" className="auth-btn auth-btn--primary auth-btn--full" disabled={pending}>
        {pending ? "Memproses..." : "Masuk"}
      </button>

      <p className="auth-form__footer">
        Butuh bantuan darurat?{" "}
        <Link href="/lookup" className="auth-link">
          Pencarian Emergency ID
        </Link>
      </p>
    </form>
  );
}
