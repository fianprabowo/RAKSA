import { UseCase } from "../../use-case";
import { WristbandSummaryDto } from "../../dto";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";

export interface ListFamilyWristbandsDependencies {
  wristbandRepository: WristbandRepository;
}

/**
 * Returns all wristbands owned by the authenticated account holder.
 */
export class ListFamilyWristbandsUseCase
  implements UseCase<string, WristbandSummaryDto[]>
{
  constructor(private readonly deps: ListFamilyWristbandsDependencies) {}

  async execute(ownerId: string): Promise<WristbandSummaryDto[]> {
    const wristbands = await this.deps.wristbandRepository.findByOwnerId(ownerId);

    return wristbands.map((w) => ({
      id: w.id,
      emergencyId: w.emergencyId.toString(),
      status: w.status,
      profileMode: w.profileMode,
      wearerRole: w.wearerRole,
      wearerLabel: w.wearerLabel,
      deviceType: w.deviceType,
      notifyOnScan: w.notifyOnScan,
      activatedAt: w.activatedAt?.toISOString(),
    }));
  }
}
