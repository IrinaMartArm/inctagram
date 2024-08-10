export type PublicPostResponse = {
  items: PublicPostByIdResponse[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type PublicPostByIdResponse = {
  authorId: string
  avatar: {
    url: string
  }
  createdAt: string
  description: string
  id: string
  images: string[]
  updatedAt: string
  username: string
}

export type PublicPostArgs = {
  postId: number
}
