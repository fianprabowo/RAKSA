import { UseCase } from "../../use-case";
import { ScanTrendPointDto } from "../../dto";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { ScanLogRepository } from "@/core/domain/repositories/scan-log-repository";

export interface GetFamilyScanTrendDependencies {
  wristbandRepository: WristbandRepository;
  scanLogRepository: ScanLogRepository;
}

const FETCH_LIMIT = 500;

function dayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Daily scan counts across the account holder's tags for the last N days,
 * zero-filled so the chart always has a continuous series.
 */
export class GetFamilyScanTrendUseCase
  implements UseCase<string, ScanTrendPointDto[]>
{
  constructor(private readonly deps: GetFamilyScanTrendDependencies) {}

  async execute(ownerId: string, days = 14): Promise<ScanTrendPointDto[]> {
    const buckets = new Map<string, number>();
    const today = new Date();
    for (let i = days - 1; i >= 0; i -= 1) {
      const d = new Date(today);
      d.setUTCDate(d.getUTCDate() - i);
      buckets.set(dayKey(d), 0);
    }

    const wristbands = await this.deps.wristbandRepository.findByOwnerId(ownerId);
    if (wristbands.length > 0) {
      const logs = await this.deps.scanLogRepository.findByWristbandIds(
        wristbands.map((w) => w.id),
        FETCH_LIMIT,
      );
      for (const log of logs) {
        const key = dayKey(log.scannedAt);
        if (buckets.has(key)) {
          buckets.set(key, (buckets.get(key) ?? 0) + 1);
        }
      }
    }

    return [...buckets.entries()].map(([date, count]) => ({ date, count }));
  }
}
