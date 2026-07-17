import { redirect } from "next/navigation";
import { Inter } from "next/font/google";
import "./dashboard.css";
import { createSupabaseServerClient } from "@/infrastructure/persistence/supabase/client/server-client";
import { createAppContainer } from "@/shared/di/container";
import { DashboardShell } from "@/presentation/components/dashboard/dashboard-shell";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dash",
  display: "swap",
});

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createSupabaseServerClient();
  const { authService } = createAppContainer(supabase);

  const user = await authService.getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className={inter.variable}>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "try{if(localStorage.getItem('raksa-theme')==='dark'){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}",
        }}
      />
      <DashboardShell userEmail={user.email}>{children}</DashboardShell>
    </div>
  );
}
