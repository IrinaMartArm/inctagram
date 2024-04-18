type MeErrorResponse = "Unauthorized";

type MeSuccessResponse = {
  email: string;
  username: string;
  userId: string;
};

export type MeResponse = MeSuccessResponse | MeErrorResponse;

export type LoginArgs = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

type ErrorData = {
  field: string;
  message: string;
};

export type ErrorsData = {
  errorsMessages: ErrorData[];
};
