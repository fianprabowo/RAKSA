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

  if (user && params.redirect?.startsWith("/") && !params.redirect.startsWith("/login")) {
    redirect(params.redirect);
  }

  return (
    <ActivationPageView
      isAuthenticated={!!user}
      userEmail={user?.email}
      redirectTo={params.redirect}
    />
  );
}
