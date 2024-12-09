export class CampaignError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "CampaignError";
    this.status = 401;
  }
}

export class CommentError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "CommentError";
    this.status = 401;
  }
}

export class DonationError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "DonationError";
    this.status = 401;
  }
}

export class EnvironmentError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "EnvironmentError";
    this.status = 401;
  }
}

export class FileUploadError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "FileUploadError";
    this.status = 401;
  }
}

export class InvalidEnumError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "InvalidEnumError";
    this.status = 401;
  }
}

export class InvalidEmailError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidEmailError";
  }
}

export class RequestBodyError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "RequestBodyError";
    this.status = 401;
  }
}

export class RequestURLError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "RequestURLError";
    this.status = 401;
  }
}

export class UserError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "UserError";
    this.status = 401;
  }
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}
