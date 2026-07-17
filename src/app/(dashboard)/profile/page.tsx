import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/infrastructure/persistence/supabase/client/server-client";
import { createAppContainer } from "@/shared/di/container";
import { ProfileView } from "@/presentation/components/dashboard/profile-view";

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();
  const { authService, useCases } = createAppContainer(supabase);

  const user = await authService.getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const wristbands = await useCases.listFamilyWristbands.execute(user.id);

  return <ProfileView userEmail={user.email} tagCount={wristbands.length} />;
}
