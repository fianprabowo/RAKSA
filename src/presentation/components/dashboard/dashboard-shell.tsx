import Link from "next/link";
import { SignOutButton } from "./sign-out-button";

interface DashboardShellProps {
  userEmail: string;
  children: React.ReactNode;
}

export function DashboardShell({ userEmail, children }: DashboardShellProps) {
  return (
    <div className="dash">
      <aside className="dash-sidebar">
        <Link href="/dashboard" className="dash-logo">
          GelangSiaga
        </Link>
        <nav className="dash-nav">
          <Link href="/dashboard" className="dash-nav__link dash-nav__link--active">
            Dashboard
          </Link>
          <Link href="/notifications" className="dash-nav__link">
            Notifikasi
          </Link>
          <Link href="/claim" className="dash-nav__link">
            Klaim Gelang
          </Link>
        </nav>
        <div className="dash-sidebar__footer">
          <p className="dash-user">{userEmail}</p>
          <SignOutButton />
        </div>
      </aside>

      <div className="dash-main">
        <header className="dash-topbar">
          <Link href="/" className="dash-topbar__home">
            Beranda
          </Link>
          <Link href="/tags/new" className="dash-btn dash-btn--primary dash-btn--sm">
            + Daftar Tag Baru
          </Link>
        </header>
        <div className="dash-content">{children}</div>
      </div>
    </div>
  );
}
