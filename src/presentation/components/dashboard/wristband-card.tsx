import Link from "next/link";
import type { WristbandSummaryDto } from "@/core/application/dto";
import { WristbandStatus } from "@/core/domain/enums";
import {
  getProfileModeLabel,
  getStatusClass,
  getStatusLabel,
  getWearerRoleLabel,
} from "./dashboard-labels";

interface WristbandCardProps {
  tag: WristbandSummaryDto;
}

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function WristbandCard({ tag }: WristbandCardProps) {
  const activatedDate = formatDate(tag.activatedAt);
  const needsSetup = tag.status === WristbandStatus.CLAIMED;

  return (
    <article className="dash-card">
      <div className="dash-card__header">
        <div>
          <h3 className="dash-card__title">{tag.wearerLabel}</h3>
          <p className="dash-card__meta">
            {getProfileModeLabel(tag.profileMode)} · {getWearerRoleLabel(tag.wearerRole)}
          </p>
        </div>
        <span className={`dash-badge ${getStatusClass(tag.status)}`}>
          {getStatusLabel(tag.status)}
        </span>
      </div>

      <dl className="dash-card__details">
        <div className="dash-card__detail">
          <dt>Emergency ID</dt>
          <dd>{tag.emergencyId}</dd>
        </div>
        {activatedDate && (
          <div className="dash-card__detail">
            <dt>Aktif sejak</dt>
            <dd>{activatedDate}</dd>
          </div>
        )}
        {tag.notifyOnScan && (
          <div className="dash-card__detail">
            <dt>Notifikasi</dt>
            <dd>Aktif saat dipindai</dd>
          </div>
        )}
      </dl>

      <div className="dash-card__actions">
        {needsSetup ? (
          <Link href="/setup" className="dash-btn dash-btn--primary dash-btn--sm">
            Lanjutkan Setup
          </Link>
        ) : (
          <>
            <Link href={`/wristbands/${tag.id}`} className="dash-btn dash-btn--outline dash-btn--sm">
              Detail
            </Link>
            <Link href="/profile" className="dash-btn dash-btn--outline dash-btn--sm">
              Edit Profil
            </Link>
            <Link href="/contacts" className="dash-btn dash-btn--outline dash-btn--sm">
              Kontak
            </Link>
          </>
        )}
      </div>
    </article>
  );
}
