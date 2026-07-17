export const WristbandStatus = {
  UNCLAIMED: "unclaimed",
  CLAIMED: "claimed",
  ACTIVE: "active",
  DISABLED: "disabled",
  REVOKED: "revoked",
} as const;

export type WristbandStatus = (typeof WristbandStatus)[keyof typeof WristbandStatus];

export const ProfileMode = {
  ADULT_EMERGENCY: "adult_emergency",
  CHILD_GUARDIAN: "child_guardian",
  ELDERLY_DEPENDENT: "elderly_dependent",
} as const;

export type ProfileMode = (typeof ProfileMode)[keyof typeof ProfileMode];

export const WearerRole = {
  SELF: "self",
  CHILD: "child",
  ELDERLY_PARENT: "elderly_parent",
} as const;

export type WearerRole = (typeof WearerRole)[keyof typeof WearerRole];

export const DeviceType = {
  BRACELET: "bracelet",
  NECKLACE: "necklace",
  KEYCHAIN: "keychain",
} as const;

export type DeviceType = (typeof DeviceType)[keyof typeof DeviceType];

export const ActivationCodeStatus = {
  UNUSED: "unused",
  USED: "used",
  REVOKED: "revoked",
} as const;

export type ActivationCodeStatus =
  (typeof ActivationCodeStatus)[keyof typeof ActivationCodeStatus];

export const AccessMethod = {
  NFC: "nfc",
  QR: "qr",
  MANUAL_LOOKUP: "manual_lookup",
  UNKNOWN: "unknown",
} as const;

export type AccessMethod = (typeof AccessMethod)[keyof typeof AccessMethod];
