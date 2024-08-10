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
export type MyPaymentsResponse = {
  items: {
    dateOfPayment: string
    endDateOfSubscription: string
    paymentType: string
    price: number
    subscriptionTimeType: string
    userId: string
  }[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}
export type GetMyPaymentsArgs = {
  page?: string
  pageSize?: string
}
