export type UserProfileArgs = {
  aboutMe?: string
  city?: string
  country?: string
  dateOfBirth?: string
  firstName: string
  lastName: string
  username: string
}
export type UserProfileResponse = {
  aboutMe: string
  avatar: {
    url: string
  }
  city: string
  country: string
  dateOfBirth: string
  firstName: string
  lastName: string
  username: string
}

export type UserPhotoArgs = {
  file: FormData
}
