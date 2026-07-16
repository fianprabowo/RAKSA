import { ValidationError } from "../errors/domain-errors";

const MIN_TOKEN_LENGTH = 32;

export class PublicToken {
  private constructor(readonly value: string) {}

  static create(raw: string): PublicToken {
    const trimmed = raw.trim();

    if (trimmed.length < MIN_TOKEN_LENGTH) {
      throw new ValidationError("Public token is too short", "publicToken");
    }

    return new PublicToken(trimmed);
  }

  equals(other: PublicToken): boolean {
    return this.value === other.value;
  }
}
