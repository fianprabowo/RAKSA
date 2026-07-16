import { ProfileMode, WristbandStatus } from "@/core/domain/enums";

const STATUS_LABELS: Record<string, string> = {
  [WristbandStatus.UNCLAIMED]: "Belum diklaim",
  [WristbandStatus.CLAIMED]: "Setup belum selesai",
  [WristbandStatus.ACTIVE]: "Aktif",
  [WristbandStatus.DISABLED]: "Nonaktif",
  [WristbandStatus.REVOKED]: "Dicabut",
};

const PROFILE_MODE_LABELS: Record<ProfileMode, string> = {
  [ProfileMode.ADULT_EMERGENCY]: "Darurat Medis",
  [ProfileMode.CHILD_GUARDIAN]: "Wali Anak",
  [ProfileMode.ELDERLY_DEPENDENT]: "Lansia",
};

const WEARER_ROLE_LABELS: Record<string, string> = {
  self: "Diri sendiri",
  child: "Anak",
  elderly_parent: "Orang tua",
};

export function getStatusLabel(status: string): string {
  return STATUS_LABELS[status] ?? status;
}

export function getProfileModeLabel(mode: ProfileMode): string {
  return PROFILE_MODE_LABELS[mode] ?? mode;
}

export function getWearerRoleLabel(role: string): string {
  return WEARER_ROLE_LABELS[role] ?? role;
}

export function getStatusClass(status: string): string {
  switch (status) {
    case WristbandStatus.ACTIVE:
      return "dash-badge--active";
    case WristbandStatus.CLAIMED:
      return "dash-badge--claimed";
    case WristbandStatus.DISABLED:
    case WristbandStatus.REVOKED:
      return "dash-badge--disabled";
    default:
      return "dash-badge--default";
  }
}
