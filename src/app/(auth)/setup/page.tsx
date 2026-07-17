import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/infrastructure/persistence/supabase/client/server-client";
import { createAppContainer } from "@/shared/di/container";
import { AuthMedia } from "@/presentation/components/auth/auth-media";
import { RaksaLogo } from "@/presentation/components/brand/raksa-logo";

interface SetupPageProps {
  searchParams: Promise<{ wristband?: string }>;
}

export default async function SetupPage({ searchParams }: SetupPageProps) {
  const supabase = await createSupabaseServerClient();
  const { authService } = createAppContainer(supabase);

  const user = await authService.getCurrentUser();
  if (!user) {
    redirect("/login?redirect=/setup");
  }

  const params = await searchParams;

  return (
    <div className="auth-shell">
      <main className="auth-panel">
        <div className="auth-panel__inner">
          <div className="auth-brand-row">
            <Link href="/" className="auth-brand" aria-label="RAKSA">
              <RaksaLogo variant="color" height={46} />
            </Link>
          </div>

          <div className="auth-panel__body">
            <div className="auth-intro">
              <h1 className="auth-intro__title">Setup Profil Darurat</h1>
              <p className="auth-intro__desc">
                Tag berhasil diklaim. Wizard setup profil akan tersedia di sini
                — pilih mode profil, isi informasi darurat, dan aktifkan tag.
              </p>
            </div>

            {params.wristband && (
              <p className="auth-setup__id">
                ID Tag: <code>{params.wristband}</code>
              </p>
            )}

            <Link href="/dashboard" className="auth-btn auth-btn--primary auth-btn--full">
              Ke Dashboard
            </Link>
          </div>
        </div>
      </main>

      <AuthMedia />
    </div>
  );
}
