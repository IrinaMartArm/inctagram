import { useGetPostsQuery } from '@/shared/assets/api/post/post-api'

export const Posts = () => {
  const { data } = useGetPostsQuery()

  console.log(data)

  return <></>
}
