export type UserProfileArgs = {
  aboutMe?: string;
  city?: string;
  dateOfBirth?: string;
  firstName: string;
  lastName: string;
  username: string;
};
export type UserProfileResponse = {
  aboutMe: string;
  city: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  username: string;
};

export type UserPhotoArgs = {
  file: FormData;
};
