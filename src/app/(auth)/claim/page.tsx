import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/infrastructure/persistence/supabase/client/server-client";
import { createAppContainer } from "@/shared/di/container";
import { ActivationPageView } from "@/presentation/components/auth/activation-page-view";

export default async function ClaimPage() {
  const supabase = await createSupabaseServerClient();
  const { authService } = createAppContainer(supabase);

  const user = await authService.getCurrentUser();
  if (!user) {
    redirect("/login?redirect=/claim");
  }

  return (
    <ActivationPageView
      isAuthenticated
      userEmail={user.email}
      variant="claim-only"
    />
  );
}
