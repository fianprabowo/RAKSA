import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/infrastructure/persistence/supabase/client/server-client";
import { createAppContainer } from "@/shared/di/container";

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
    <div className="auth-page">
      <header className="auth-page__header">
        <Link href="/" className="auth-page__logo">
          GelangSiaga
        </Link>
      </header>

      <main className="auth-page__main">
        <div className="auth-card">
          <div className="auth-card__intro">
            <h1 className="auth-card__title">Setup Profil Darurat</h1>
            <p className="auth-card__desc">
              Gelang berhasil diklaim. Wizard setup profil akan tersedia di sini — pilih mode
              profil, isi informasi darurat, dan aktifkan gelang.
            </p>
          </div>

          {params.wristband && (
            <p className="auth-setup__id">
              ID Gelang: <code>{params.wristband}</code>
            </p>
          )}

          <Link href="/dashboard" className="auth-btn auth-btn--primary auth-btn--full">
            Ke Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
