import { ProfileMode, WearerRole } from "../enums";

/**
 * Business rules linking who wears a tag (WearerRole) to the emergency page
 * template (ProfileMode) and sensible defaults. Kept in the domain so both the
 * claim flow and the edit flow stay consistent.
 */
const ROLE_TO_PROFILE_MODE: Record<WearerRole, ProfileMode> = {
  [WearerRole.SELF]: ProfileMode.ADULT_EMERGENCY,
  [WearerRole.CHILD]: ProfileMode.CHILD_GUARDIAN,
  [WearerRole.ELDERLY_PARENT]: ProfileMode.ELDERLY_DEPENDENT,
};

export function profileModeForRole(role: WearerRole): ProfileMode {
  return ROLE_TO_PROFILE_MODE[role] ?? ProfileMode.ADULT_EMERGENCY;
}

/**
 * Dependents (children, elderly parents) default to scan notifications on so
 * the guardian is alerted; the account holder's own tag defaults to off.
 */
export function notifyDefaultForRole(role: WearerRole): boolean {
  return role !== WearerRole.SELF;
}
