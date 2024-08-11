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

export type getPublicUserArgs = { userId: string }
