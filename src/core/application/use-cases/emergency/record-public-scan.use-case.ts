import { UseCase } from "../../use-case";
import { RecordScanInput, RecordScanOutput } from "../../dto";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { ScanLogRepository } from "@/core/domain/repositories/scan-log-repository";
import { ScanNotificationRepository } from "@/core/domain/repositories/scan-notification-repository";
import { PublicToken } from "@/core/domain/value-objects/public-token";
import { NotFoundError } from "@/core/domain/errors/domain-errors";
import { ScanNotification } from "@/core/domain/entities/scan-notification";
import { IdGenerator } from "../../ports/id-generator";
import { Clock } from "../../ports/clock";

export interface RecordPublicScanDependencies {
  wristbandRepository: WristbandRepository;
  scanLogRepository: ScanLogRepository;
  scanNotificationRepository: ScanNotificationRepository;
  idGenerator: IdGenerator;
  clock: Clock;
}

/**
 * Records a public scan event and optionally notifies the account holder.
 */
export class RecordPublicScanUseCase
  implements UseCase<RecordScanInput, RecordScanOutput>
{
  constructor(private readonly deps: RecordPublicScanDependencies) {}

  async execute(input: RecordScanInput): Promise<RecordScanOutput> {
    const publicToken = PublicToken.create(input.publicToken);
    const wristband = await this.deps.wristbandRepository.findByPublicToken(publicToken);

    if (!wristband || !wristband.isPubliclyAccessible()) {
      throw new NotFoundError("Emergency page not found");
    }

    const scanLog = await this.deps.scanLogRepository.create({
      wristbandId: wristband.id,
      accessMethod: input.accessMethod,
      userAgent: input.userAgent,
      ipHash: input.ipHash,
    });

    const shouldNotifyOwner =
      wristband.notifyOnScan && wristband.ownerId !== undefined;

    if (shouldNotifyOwner && wristband.ownerId) {
      await this.deps.scanNotificationRepository.save(
        ScanNotification.reconstitute({
          id: this.deps.idGenerator.generate(),
          accountHolderId: wristband.ownerId,
          wristbandId: wristband.id,
          scanLogId: scanLog.id,
          message: `Tag "${wristband.wearerLabel}" was scanned`,
          isRead: false,
          createdAt: this.deps.clock.now(),
        }),
      );
    }

    return {
      scanLogId: scanLog.id,
      shouldNotifyOwner,
    };
  }
}
