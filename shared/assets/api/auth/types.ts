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
export type emailResendingArgs = {
  email: string;
};
export type ErrorsMessages = {
  errorsMessages: RootObjectErrorsMessages[];
};
export type RootObjectErrorsMessages = {
  field: string;
  message: string;
};
