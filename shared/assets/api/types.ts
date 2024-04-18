type MeErrorResponse = "Unauthorized";

type MeSuccessResponse = {
  email: string;
  userId: string;
  username: string;
};

export type MeResponse = MeErrorResponse | MeSuccessResponse;

export type LoginArgs = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};
