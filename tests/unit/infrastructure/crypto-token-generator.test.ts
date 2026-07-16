import { describe, expect, it } from "vitest";
import { CryptoTokenGenerator } from "@/infrastructure/security/crypto-token-generator";
import { EmergencyId } from "@/core/domain/value-objects/emergency-id";
import { PublicToken } from "@/core/domain/value-objects/public-token";
import { isValidActivationCodeFormat } from "@/core/domain/value-objects/activation-code-value";

describe("CryptoTokenGenerator", () => {
  const generator = new CryptoTokenGenerator();

  it("generates an Emergency ID accepted by the EmergencyId value object", () => {
    for (let i = 0; i < 50; i += 1) {
      const id = generator.generateEmergencyId();
      expect(id).toMatch(/^GS-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
      expect(() => EmergencyId.create(id)).not.toThrow();
    }
  });

  it("generates a public token accepted by the PublicToken value object", () => {
    const token = generator.generatePublicToken();
    expect(token).toHaveLength(64);
    expect(() => PublicToken.create(token)).not.toThrow();
  });

  it("generates a valid 6-char activation code", () => {
    for (let i = 0; i < 50; i += 1) {
      const code = generator.generateActivationCode();
      expect(code).toHaveLength(6);
      expect(isValidActivationCodeFormat(code)).toBe(true);
    }
  });

  it("produces unique values across many calls", () => {
    const tokens = new Set(Array.from({ length: 100 }, () => generator.generatePublicToken()));
    expect(tokens.size).toBe(100);
  });
});
