import { ValidationError } from "../errors/domain-errors";

const EMERGENCY_ID_PATTERN = /^GS-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

export class EmergencyId {
  private constructor(readonly value: string) {}

  static create(raw: string): EmergencyId {
    const normalized = raw.trim().toUpperCase();

    if (!EMERGENCY_ID_PATTERN.test(normalized)) {
      throw new ValidationError(
        "Emergency ID must match format GS-XXXX-XXXX",
        "emergencyId",
      );
    }

    return new EmergencyId(normalized);
  }

  equals(other: EmergencyId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
