import type { WristbandSummaryDto } from "@/core/application/dto";
import { WristbandStatus } from "@/core/domain/enums";

interface DashboardStatsProps {
  wristbands: WristbandSummaryDto[];
}

export function DashboardStats({ wristbands }: DashboardStatsProps) {
  const active = wristbands.filter((w) => w.status === WristbandStatus.ACTIVE).length;
  const pending = wristbands.filter((w) => w.status === WristbandStatus.CLAIMED).length;
  const total = wristbands.length;

  return (
    <div className="dash-stats">
      <div className="dash-stat">
        <span className="dash-stat__value">{total}</span>
        <span className="dash-stat__label">Total Gelang</span>
      </div>
      <div className="dash-stat dash-stat--green">
        <span className="dash-stat__value">{active}</span>
        <span className="dash-stat__label">Aktif</span>
      </div>
      <div className="dash-stat dash-stat--amber">
        <span className="dash-stat__value">{pending}</span>
        <span className="dash-stat__label">Perlu Setup</span>
      </div>
    </div>
  );
}
