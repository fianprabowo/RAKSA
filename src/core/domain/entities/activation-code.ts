import { ActivationCodeStatus } from "../enums";
import { normalizeActivationCode } from "../value-objects/activation-code-value";

export interface ActivationCodeProps {
  id: string;
  wristbandId: string;
  code: string;
  status: ActivationCodeStatus;
  usedBy?: string;
  usedAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
}

export class ActivationCode {
  readonly id: string;
  readonly wristbandId: string;
  readonly code: string;
  readonly status: ActivationCodeStatus;
  readonly usedBy?: string;
  readonly usedAt?: Date;
  readonly expiresAt?: Date;
  readonly createdAt: Date;

  private constructor(props: ActivationCodeProps) {
    this.id = props.id;
    this.wristbandId = props.wristbandId;
    this.code = props.code;
    this.status = props.status;
    this.usedBy = props.usedBy;
    this.usedAt = props.usedAt;
    this.expiresAt = props.expiresAt;
    this.createdAt = props.createdAt;
  }

  static reconstitute(props: ActivationCodeProps): ActivationCode {
    return new ActivationCode(props);
  }

  /** Factory for a freshly issued, unused activation code (admin provisioning). */
  static issue(props: {
    id: string;
    wristbandId: string;
    code: string;
    now: Date;
    expiresAt?: Date;
  }): ActivationCode {
    return new ActivationCode({
      id: props.id,
      wristbandId: props.wristbandId,
      code: normalizeActivationCode(props.code),
      status: ActivationCodeStatus.UNUSED,
      expiresAt: props.expiresAt,
      createdAt: props.now,
    });
  }

  matches(input: string): boolean {
    return this.code === normalizeActivationCode(input);
  }

  isUsable(now: Date = new Date()): boolean {
    if (this.status !== ActivationCodeStatus.UNUSED) {
      return false;
    }

    if (this.expiresAt && this.expiresAt < now) {
      return false;
    }

    return true;
  }

  withUsed(userId: string, usedAt: Date): ActivationCode {
    return ActivationCode.reconstitute({
      ...this.toProps(),
      status: ActivationCodeStatus.USED,
      usedBy: userId,
      usedAt,
    });
  }

  private toProps(): ActivationCodeProps {
    return {
      id: this.id,
      wristbandId: this.wristbandId,
      code: this.code,
      status: this.status,
      usedBy: this.usedBy,
      usedAt: this.usedAt,
      expiresAt: this.expiresAt,
      createdAt: this.createdAt,
    };
  }
}
