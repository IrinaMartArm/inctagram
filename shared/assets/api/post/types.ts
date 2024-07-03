export type EditPostArgs = {
  description: string
  id: number
}
export type getPostArgs = {
  id: string
}
export type DeletePostArgs = {
  id: number
}
export type AddPostReq = {
  description: string
  images: string[]
}

export type PostType = {
  items: PostItemType[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type PostItemType = {
  authorId: string
  createdAt: string
  description: string
  id: string
  images: string[]
  updatedAt: string
  username: string
}
export type PostItemTypeRes = Omit<PostItemType, 'images'> & {
  imagesUrl: string[]
}
