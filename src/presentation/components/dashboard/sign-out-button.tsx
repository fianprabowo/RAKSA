"use client";

import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/infrastructure/persistence/supabase/client/browser-client";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button type="button" className="dash-btn dash-btn--ghost" onClick={handleSignOut}>
      Keluar
    </button>
  );
}
