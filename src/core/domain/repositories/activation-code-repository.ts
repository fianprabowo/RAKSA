import { ActivationCode } from "../entities/activation-code";

/** Port — activation code lookup and mutation. */
export interface ActivationCodeRepository {
  findUnusedByCode(code: string): Promise<ActivationCode | null>;
  findUnusedByWristbandId(wristbandId: string): Promise<ActivationCode | null>;
  findByWristbandId(wristbandId: string): Promise<ActivationCode | null>;
  findByWristbandIds(wristbandIds: string[]): Promise<ActivationCode[]>;
  /** Uniqueness check across all statuses (used during provisioning). */
  existsByCode(code: string): Promise<boolean>;
  save(code: ActivationCode): Promise<void>;
}
