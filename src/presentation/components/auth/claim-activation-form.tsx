"use client";

import { useActionState } from "react";
import { claimWristbandAction, type ActionResult } from "@/app/(auth)/actions";

const initialState: ActionResult = {};

export function ClaimActivationForm() {
  const [state, formAction, pending] = useActionState(claimWristbandAction, initialState);

  return (
    <form action={formAction} className="auth-form__body">
      <div className="auth-field">
        <label htmlFor="activationCode" className="auth-field__label">
          Kode Aktivasi
        </label>
        <input
          id="activationCode"
          name="activationCode"
          type="text"
          className="auth-field__input auth-field__input--code"
          placeholder="Contoh: A1B2C3"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          required
        />
        <p className="auth-field__hint">
          Temukan Kode Aktivasi di dalam paket atau buku manual tag Anda. Kode ini bersifat
          pribadi dan tidak tercetak di tag.
        </p>
      </div>

      {state.error && (
        <p className="auth-form__error" role="alert">
          {state.error}
        </p>
      )}

      <button type="submit" className="auth-btn auth-btn--primary auth-btn--full" disabled={pending}>
        {pending ? "Memvalidasi..." : "Klaim Tag"}
      </button>
    </form>
  );
}
