export type EditPostArgs = {
  description: string
  id: string
}

export type getPostArgs = {
  id: string
}

export type DeletePostArgs = {
  id: string
}

export type AddPostReq = {
  description: string
  images: string[]
}

export type PostsType = {
  items: PostType[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type MyPostsType = {
  items: MyPostType[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type PostType = {
  authorId: string
  createdAt: string
  description: string
  id: string
  images: string[]
  updatedAt: string
  username: string
}

export type MyPostType = {
  authorId: string
  createdAt: string
  description: string
  id: string
  images: string[]
  updatedAt: string
  username: string
}

export type PostItemTypeRes = Omit<PostType, 'images'> & {
  imagesUrl: string[]
}

export type GetPostsArgs = {
  page?: string
  pageSize?: string
  userId: string
}
