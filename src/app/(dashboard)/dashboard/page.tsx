import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/infrastructure/persistence/supabase/client/server-client";
import { createAppContainer } from "@/shared/di/container";
import { DashboardView } from "@/presentation/components/dashboard/dashboard-view";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { authService, useCases } = createAppContainer(supabase);

  const user = await authService.getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const [wristbands, activity, scanTrend] = await Promise.all([
    useCases.listFamilyWristbands.execute(user.id),
    useCases.listFamilyScanActivity.execute(user.id),
    useCases.getFamilyScanTrend.execute(user.id),
  ]);

  return (
    <DashboardView
      userEmail={user.email}
      wristbands={wristbands}
      activity={activity}
      scanTrend={scanTrend}
    />
  );
}
