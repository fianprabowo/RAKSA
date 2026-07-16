import Link from "next/link";
import type { WristbandSummaryDto } from "@/core/application/dto";
import { WristbandCard } from "./wristband-card";

interface WristbandListProps {
  wristbands: WristbandSummaryDto[];
}

export function WristbandList({ wristbands }: WristbandListProps) {
  if (wristbands.length === 0) {
    return (
      <div className="dash-empty">
        <div className="dash-empty__icon" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12h8" />
          </svg>
        </div>
        <h2 className="dash-empty__title">Belum ada gelang terdaftar</h2>
        <p className="dash-empty__text">
          Klaim gelang pertama Anda dengan Kode Aktivasi dari paket, lalu selesaikan setup profil
          darurat.
        </p>
        <div className="dash-empty__actions">
          <Link href="/claim" className="dash-btn dash-btn--primary">
            Klaim Gelang Pertama
          </Link>
          <Link href="/tags/new" className="dash-btn dash-btn--outline">
            Daftar Tag Baru
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dash-card-grid">
      {wristbands.map((tag) => (
        <WristbandCard key={tag.id} tag={tag} />
      ))}
    </div>
  );
}
