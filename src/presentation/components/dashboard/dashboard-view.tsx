import type { WristbandSummaryDto } from "@/core/application/dto";
import { DashboardStats } from "./dashboard-stats";
import { WristbandList } from "./wristband-list";

interface DashboardViewProps {
  userEmail: string;
  wristbands: WristbandSummaryDto[];
}

export function DashboardView({ userEmail, wristbands }: DashboardViewProps) {
  return (
    <>
      <div className="dash-page-header">
        <div>
          <h1 className="dash-page-title">Dashboard Keluarga</h1>
          <p className="dash-page-subtitle">Selamat datang, {userEmail}</p>
        </div>
      </div>

      {wristbands.length > 0 && <DashboardStats wristbands={wristbands} />}

      <section className="dash-section">
        <div className="dash-section__header">
          <h2 className="dash-section__title">Gelang Keluarga</h2>
          <p className="dash-section__desc">
            Kelola semua tag untuk diri sendiri, anak, dan orang tua dari satu akun.
          </p>
        </div>
        <WristbandList wristbands={wristbands} />
      </section>

      <section className="dash-section">
        <div className="dash-section__header">
          <h2 className="dash-section__title">Aktivitas Terbaru</h2>
          <p className="dash-section__desc">Pemindaian gelang oleh orang di sekitar.</p>
        </div>
        <div className="dash-activity-empty">
          <p>Belum ada pemindaian tercatat.</p>
          <p className="dash-activity-empty__hint">
            Anda akan melihat riwayat di sini ketika seseorang memindai gelang keluarga Anda.
          </p>
        </div>
      </section>
    </>
  );
}
