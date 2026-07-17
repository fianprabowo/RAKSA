"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { WearerRole } from "@/core/domain/enums";
import { DomainError } from "@/core/domain/errors/domain-errors";
import { createSupabaseServerClient } from "@/infrastructure/persistence/supabase/client/server-client";
import { createAppContainer } from "@/shared/di/container";

export interface FamilyActionState {
  error?: string;
  fieldErrors?: Record<string, string>;
  success?: boolean;
}

const addSchema = z.object({
  activationCode: z.string().trim().min(1, "Kode aktivasi wajib diisi"),
  wearerRole: z.nativeEnum(WearerRole),
  wearerLabel: z
    .string()
    .trim()
    .min(1, "Nama anggota wajib diisi")
    .max(80, "Nama maksimal 80 karakter"),
  notifyOnScan: z.boolean(),
});

const editSchema = z.object({
  wristbandId: z.string().trim().min(1, "Tag tidak valid"),
  wearerRole: z.nativeEnum(WearerRole),
  wearerLabel: z
    .string()
    .trim()
    .min(1, "Nama anggota wajib diisi")
    .max(80, "Nama maksimal 80 karakter"),
  notifyOnScan: z.boolean(),
});

function toFieldErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    fieldErrors[issue.path.join(".")] = issue.message;
  }
  return fieldErrors;
}

function mapError(error: unknown): string {
  if (error instanceof DomainError) return error.message;
  return "Terjadi kesalahan. Silakan coba lagi.";
}

/**
 * Adds a family member by claiming their tag and setting who wears it
 * (self / child / elderly parent) plus the display name.
 */
export async function addFamilyMemberAction(
  _prev: FamilyActionState,
  formData: FormData,
): Promise<FamilyActionState> {
  const parsed = addSchema.safeParse({
    activationCode: String(formData.get("activationCode") ?? ""),
    wearerRole: formData.get("wearerRole") ?? undefined,
    wearerLabel: String(formData.get("wearerLabel") ?? ""),
    notifyOnScan: formData.get("notifyOnScan") != null,
  });

  if (!parsed.success) {
    return { error: "Periksa kembali input Anda.", fieldErrors: toFieldErrors(parsed.error) };
  }

  const supabase = await createSupabaseServerClient();
  const { authService, useCases } = createAppContainer(supabase);

  const user = await authService.getCurrentUser();
  if (!user) {
    return { error: "Silakan masuk terlebih dahulu." };
  }

  try {
    await useCases.claimWristband.execute({
      ownerId: user.id,
      activationCode: parsed.data.activationCode,
      wearerRole: parsed.data.wearerRole,
      wearerLabel: parsed.data.wearerLabel,
      notifyOnScan: parsed.data.notifyOnScan,
    });
  } catch (error) {
    return { error: mapError(error) };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

/** Edits an existing family member's role, name, and scan-notification setting. */
export async function updateFamilyMemberAction(
  _prev: FamilyActionState,
  formData: FormData,
): Promise<FamilyActionState> {
  const parsed = editSchema.safeParse({
    wristbandId: String(formData.get("wristbandId") ?? ""),
    wearerRole: formData.get("wearerRole") ?? undefined,
    wearerLabel: String(formData.get("wearerLabel") ?? ""),
    notifyOnScan: formData.get("notifyOnScan") != null,
  });

  if (!parsed.success) {
    return { error: "Periksa kembali input Anda.", fieldErrors: toFieldErrors(parsed.error) };
  }

  const supabase = await createSupabaseServerClient();
  const { authService, useCases } = createAppContainer(supabase);

  const user = await authService.getCurrentUser();
  if (!user) {
    return { error: "Silakan masuk terlebih dahulu." };
  }

  try {
    await useCases.updateWristbandWearer.execute({
      ownerId: user.id,
      wristbandId: parsed.data.wristbandId,
      wearerRole: parsed.data.wearerRole,
      wearerLabel: parsed.data.wearerLabel,
      notifyOnScan: parsed.data.notifyOnScan,
    });
  } catch (error) {
    return { error: mapError(error) };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
