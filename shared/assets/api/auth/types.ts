export type User = {
  email: string;
  login: string;
  userId: string;
};

type MeErrorResponse = "Unauthorized";

export type SignUpArgs = {
  email: string;
  password: string;
  userName: string;
};
export type EmailResendingArgs = {
  email: string;
};

export type ErrorsMessages = {
  errorsMessages: ErrorsMessage[];
};
export type ErrorsMessage = {
  field: string;
  message: string;
};
export type ConformationArgs = {
  code: string;
};

export type MeResponse = MeErrorResponse | User;

export type LoginArgs = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};
export type NewPasswordArgs = {
  newPassword: string;
  recoveryCode: string;
};
export type PasswordRecoveryArgs = {
  email: string;
  reCaptcha: string;
};
