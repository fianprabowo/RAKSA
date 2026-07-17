import { UseCase } from "../../use-case";
import { ScanActivityDto } from "../../dto";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { ScanLogRepository } from "@/core/domain/repositories/scan-log-repository";

export interface ListFamilyScanActivityDependencies {
  wristbandRepository: WristbandRepository;
  scanLogRepository: ScanLogRepository;
}

/**
 * Returns the most recent scans across all tags owned by the account holder.
 */
export class ListFamilyScanActivityUseCase
  implements UseCase<string, ScanActivityDto[]>
{
  constructor(private readonly deps: ListFamilyScanActivityDependencies) {}

  async execute(ownerId: string, limit = 10): Promise<ScanActivityDto[]> {
    const wristbands = await this.deps.wristbandRepository.findByOwnerId(ownerId);
    if (wristbands.length === 0) return [];

    const labelById = new Map(wristbands.map((w) => [w.id, w.wearerLabel]));
    const logs = await this.deps.scanLogRepository.findByWristbandIds(
      [...labelById.keys()],
      limit,
    );

    return logs.map((log) => ({
      id: log.id,
      wearerLabel: labelById.get(log.wristbandId) ?? "Tag",
      accessMethod: log.accessMethod,
      scannedAt: log.scannedAt.toISOString(),
      locationShared: log.locationShared,
    }));
  }
}
