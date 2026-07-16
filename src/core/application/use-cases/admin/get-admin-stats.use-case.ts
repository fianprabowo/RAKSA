import { UseCase } from "../../use-case";
import { AdminStatsDto } from "../../dto";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { Clock } from "../../ports/clock";
import { WristbandStatus } from "@/core/domain/enums";

export interface GetAdminStatsDependencies {
  wristbandRepository: WristbandRepository;
  clock: Clock;
}

export class GetAdminStatsUseCase implements UseCase<void, AdminStatsDto> {
  constructor(private readonly deps: GetAdminStatsDependencies) {}

  async execute(): Promise<AdminStatsDto> {
    const counts = await this.deps.wristbandRepository.countByStatus();

    const startOfToday = new Date(this.deps.clock.now());
    startOfToday.setHours(0, 0, 0, 0);
    const activatedToday =
      await this.deps.wristbandRepository.countActivatedSince(startOfToday);

    const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
    const pending =
      (counts[WristbandStatus.UNCLAIMED] ?? 0) +
      (counts[WristbandStatus.CLAIMED] ?? 0);
    const inactive =
      (counts[WristbandStatus.DISABLED] ?? 0) +
      (counts[WristbandStatus.REVOKED] ?? 0);

    return { total, activatedToday, pending, inactive };
  }
}
