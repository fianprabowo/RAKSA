import { ValidationError } from "../errors/domain-errors";

export class PhoneNumber {
  private constructor(readonly value: string) {}

  static create(raw: string): PhoneNumber {
    const digits = raw.replace(/\D/g, "");

    if (digits.length < 8 || digits.length > 15) {
      throw new ValidationError("Invalid phone number", "phone");
    }

    return new PhoneNumber(digits);
  }

  toTelUri(): string {
    return `tel:+${this.value.startsWith("62") ? this.value : `62${this.value.replace(/^0/, "")}`}`;
  }
}
