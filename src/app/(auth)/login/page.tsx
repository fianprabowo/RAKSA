import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/infrastructure/persistence/supabase/client/server-client";
import { createAppContainer } from "@/shared/di/container";
import { ActivationPageView } from "@/presentation/components/auth/activation-page-view";

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const supabase = await createSupabaseServerClient();
  const { authService } = createAppContainer(supabase);
  const params = await searchParams;

  const user = await authService.getCurrentUser();

  // Already logged in? The login page is off-limits — send them onward.
  // (Primary guard is in middleware; this is a defensive server-side backup.)
  if (user) {
    const requested = params.redirect;
    const safeTarget =
      requested?.startsWith("/") &&
      !requested.startsWith("/login") &&
      !requested.startsWith("/register");
    redirect(safeTarget ? requested! : "/dashboard");
  }

  return (
    <ActivationPageView isAuthenticated={false} redirectTo={params.redirect} />
  );
}
