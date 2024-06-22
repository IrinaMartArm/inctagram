export type EditPostArgs = {
  description: string
  id: number
}

export type DeletePostArgs = {
  id: number
}
export type AddPostResp = {
  authorId: string
  createdAt: string
  description: string
  id: string
  images: string[]
  updatedAt: string
}
export type AddPostReq = {
  description: string
  images: string[]
}
