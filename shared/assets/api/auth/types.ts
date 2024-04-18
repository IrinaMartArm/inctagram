export type User = {
  email: string;
  login: string;
  userId: string;
};
export type SignUpArgs = {
  email: string;
  password: string;
  username: string;
};
export type EmailResendingArgs = {
  email: string;
};
export type ErrorsMessages = {
  errorsMessages: RootObjectErrorsMessages[];
};
export type RootObjectErrorsMessages = {
  field: string;
  message: string;
};
export type ConformationArgs = {
  code: string;
};
export type NewPasswordArgs = {
  newPassword: string;
  recoveryCode: string;
};
