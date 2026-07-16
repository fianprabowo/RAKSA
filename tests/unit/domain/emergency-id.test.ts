import { describe, expect, it } from "vitest";
import { EmergencyId } from "@/core/domain/value-objects/emergency-id";
import { ValidationError } from "@/core/domain/errors/domain-errors";

describe("EmergencyId", () => {
  it("accepts valid format", () => {
    const id = EmergencyId.create("gs-a7k2-m9p4");
    expect(id.toString()).toBe("GS-A7K2-M9P4");
  });

  it("rejects invalid format", () => {
    expect(() => EmergencyId.create("INVALID")).toThrow(ValidationError);
  });
});
