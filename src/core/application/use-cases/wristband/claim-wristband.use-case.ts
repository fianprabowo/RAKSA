import { UseCase } from "../../use-case";
import {
  ClaimWristbandInput,
  ClaimWristbandOutput,
} from "../../dto";
import { ActivationCodeRepository } from "@/core/domain/repositories/activation-code-repository";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { Clock } from "../../ports/clock";
import {
  InvalidActivationCodeError,
  NotFoundError,
  ValidationError,
} from "@/core/domain/errors/domain-errors";
import {
  isValidActivationCodeFormat,
  normalizeActivationCode,
} from "@/core/domain/value-objects/activation-code-value";

export interface ClaimWristbandDependencies {
  wristbandRepository: WristbandRepository;
  activationCodeRepository: ActivationCodeRepository;
  clock: Clock;
}

/**
 * Claims an unclaimed wristband using a one-time activation code.
 * Single Responsibility: orchestrates claim workflow only.
 */
export class ClaimWristbandUseCase
  implements UseCase<ClaimWristbandInput, ClaimWristbandOutput>
{
  constructor(private readonly deps: ClaimWristbandDependencies) {}

  async execute(input: ClaimWristbandInput): Promise<ClaimWristbandOutput> {
    const normalized = normalizeActivationCode(input.activationCode);

    if (!normalized) {
      throw new ValidationError("Kode aktivasi wajib diisi", "activationCode");
    }

    if (!isValidActivationCodeFormat(normalized)) {
      throw new InvalidActivationCodeError("Format kode aktivasi tidak valid");
    }

    const activationCode =
      await this.deps.activationCodeRepository.findUnusedByCode(normalized);

    if (!activationCode) {
      throw new InvalidActivationCodeError(
        "Kode aktivasi tidak valid atau sudah digunakan",
      );
    }

    return this.validateAndClaim(
      activationCode.wristbandId,
      input.ownerId,
      normalized,
    );
  }

  /** Internal helper — validates code against wristband (used by full implementation). */
  protected async validateAndClaim(
    wristbandId: string,
    ownerId: string,
    plainCode: string,
  ): Promise<ClaimWristbandOutput> {
    const wristband = await this.deps.wristbandRepository.findById(wristbandId);

    if (!wristband) {
      throw new NotFoundError("Wristband not found");
    }

    const activationCode =
      await this.deps.activationCodeRepository.findUnusedByWristbandId(wristbandId);

    if (!activationCode || !activationCode.isUsable(this.deps.clock.now())) {
      throw new InvalidActivationCodeError("Activation code is invalid or expired");
    }

    if (!activationCode.matches(plainCode)) {
      throw new InvalidActivationCodeError("Activation code is invalid or expired");
    }

    const now = this.deps.clock.now();
    const claimed = wristband.withClaimed(ownerId, now);

    await this.deps.wristbandRepository.save(claimed);
    await this.deps.activationCodeRepository.save(
      activationCode.withUsed(ownerId, now),
    );

    return {
      wristbandId: claimed.id,
      wearerLabel: claimed.wearerLabel,
    };
  }
}
