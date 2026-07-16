const ACTIVATION_CODE_PATTERN = /^[A-Z0-9]{6}$/;

/** Normalizes user input: trim + uppercase. Accepts a-z/A-Z/0-9 on input. */
export function normalizeActivationCode(raw: string): string {
  return raw.trim().toUpperCase();
}

export function isValidActivationCodeFormat(raw: string): boolean {
  return ACTIVATION_CODE_PATTERN.test(normalizeActivationCode(raw));
}
