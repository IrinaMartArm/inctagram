export type UserProfile = {
  aboutMe: string
  avatar: Avatar
  followers: number
  following: number
  publications: Publication[]
  publicationsCount: number
  username: string
}

export type Publication = {
  authorId: string
  createdAt: string
  description: string
  id: string
  images: string[]
  updatedAt: string
}

export type Avatar = {
  url: string
}

export enum Subscr {
  MONTHLY = 'MONTHLY',
  STRIPE = 'STRIPE',
}

export type CreateSubscriptionArgs = {
  autoRenewal: boolean
  paymentCount: number
  paymentType: string
  subscriptionTimeType: string
}

export type CreateSubscriptionResp = {
  url: string
}

export type MyPaymentsArgs = {
  page: number
  pageSize: number
}

export type Items = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: string
  price: number
  subscriptionTimeType: string
  userId: string
}

export type MyPaymentsResponse = {
  items: Items[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type CurrentSubscriptionResponse = {
  autoRenewal: boolean
  customerId: string
  expireAt: string
  nextPayment: string
  subscriptionId: string
  userId: string
}
