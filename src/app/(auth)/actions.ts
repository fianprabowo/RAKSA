"use server";

import { redirect } from "next/navigation";
import {
  DomainError,
  InvalidActivationCodeError,
  ValidationError,
} from "@/core/domain/errors/domain-errors";
import {
  isValidActivationCodeFormat,
  normalizeActivationCode,
} from "@/core/domain/value-objects/activation-code-value";
import { createSupabaseServerClient } from "@/infrastructure/persistence/supabase/client/server-client";
import { resolvePersistenceClient } from "@/infrastructure/persistence/supabase/client/persistence-client";
import { SupabaseActivationCodeRepository } from "@/infrastructure/persistence/supabase/repositories/supabase-activation-code.repository";
import { createAppContainer } from "@/shared/di/container";

export interface ActionResult {
  error?: string;
  activationCode?: string;
}

async function assertValidUnusedCode(
  activationCode: string,
): Promise<string> {
  const normalized = normalizeActivationCode(activationCode);

  if (!normalized) {
    throw new ValidationError("Kode aktivasi wajib diisi", "activationCode");
  }

  if (!isValidActivationCodeFormat(normalized)) {
    throw new InvalidActivationCodeError("Format kode aktivasi tidak valid");
  }

  const supabase = await createSupabaseServerClient();
  const db = resolvePersistenceClient(supabase);
  const activationCodeRepository = new SupabaseActivationCodeRepository(db);
  const record = await activationCodeRepository.findUnusedByCode(normalized);

  if (!record) {
    throw new InvalidActivationCodeError(
      "Kode aktivasi tidak valid atau sudah digunakan",
    );
  }

  return normalized;
}

export async function verifyActivationCodeAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const activationCode = String(formData.get("activationCode") ?? "").trim();

  try {
    const normalized = await assertValidUnusedCode(activationCode);
    return { activationCode: normalized };
  } catch (error) {
    if (error instanceof DomainError) {
      return { error: error.message };
    }

    return { error: "Terjadi kesalahan. Silakan coba lagi." };
  }
}

export async function signInAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email dan kata sandi wajib diisi." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Email atau kata sandi salah." };
  }

  const redirectTo = String(formData.get("redirect") ?? "").trim();
  redirect(redirectTo || "/dashboard");
}

export async function signUpAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const activationCode = String(formData.get("activationCode") ?? "").trim();

  if (!fullName || !email || !password) {
    return { error: "Nama, email, dan kata sandi wajib diisi." };
  }

  if (!activationCode) {
    return { error: "Kode aktivasi wajib diverifikasi terlebih dahulu." };
  }

  if (password.length < 6) {
    return { error: "Kata sandi minimal 6 karakter." };
  }

  try {
    await assertValidUnusedCode(activationCode);
  } catch (error) {
    if (error instanceof DomainError) {
      return { error: error.message };
    }

    return { error: "Kode aktivasi tidak valid." };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { error: error.message };
  }

  if (!data.user) {
    return { error: "Gagal membuat akun. Silakan coba lagi." };
  }

  const db = resolvePersistenceClient(supabase);
  const { error: profileError } = await db.from("profiles").upsert({
    id: data.user.id,
    full_name: fullName,
    display_name: fullName,
  });

  if (profileError) {
    return { error: "Akun dibuat tetapi profil gagal disimpan. Coba masuk kembali." };
  }

  const { useCases } = createAppContainer(supabase);

  try {
    const result = await useCases.claimWristband.execute({
      ownerId: data.user.id,
      activationCode,
    });

    redirect(`/setup?wristband=${result.wristbandId}`);
  } catch (claimError) {
    if (claimError instanceof DomainError) {
      return { error: claimError.message };
    }

    throw claimError;
  }
}

export async function claimWristbandAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const activationCode = String(formData.get("activationCode") ?? "").trim();

  if (!activationCode) {
    return { error: "Kode aktivasi wajib diisi." };
  }

  const supabase = await createSupabaseServerClient();
  const { authService, useCases } = createAppContainer(supabase);

  const user = await authService.getCurrentUser();
  if (!user) {
    return { error: "Silakan masuk terlebih dahulu." };
  }

  try {
    const result = await useCases.claimWristband.execute({
      ownerId: user.id,
      activationCode,
    });

    redirect(`/setup?wristband=${result.wristbandId}`);
  } catch (error) {
    if (error instanceof DomainError) {
      return { error: error.message };
    }

    throw error;
  }
}
