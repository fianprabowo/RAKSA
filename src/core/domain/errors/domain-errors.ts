/**
 * Base class for domain-specific errors.
 * Presentation layer maps these to HTTP responses / UI messages.
 */
export abstract class DomainError extends Error {
  abstract readonly code: string;

  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

export class NotFoundError extends DomainError {
  readonly code = "NOT_FOUND";
}

export class ValidationError extends DomainError {
  readonly code = "VALIDATION_ERROR";

  constructor(
    message: string,
    readonly field?: string,
  ) {
    super(message);
  }
}

export class UnauthorizedError extends DomainError {
  readonly code = "UNAUTHORIZED";
}

export class ConflictError extends DomainError {
  readonly code = "CONFLICT";
}

export class ForbiddenError extends DomainError {
  readonly code = "FORBIDDEN";
}

export class InactiveWristbandError extends DomainError {
  readonly code = "WRISTBAND_INACTIVE";
}

export class InvalidActivationCodeError extends DomainError {
  readonly code = "INVALID_ACTIVATION_CODE";
}
