import { useState } from 'react'

import { useGetPostQuery, useGetPostsQuery } from '@/shared/assets/api/post/post-api'
import { PostItemType } from '@/shared/assets/api/post/types'
import { PageWrapper } from '@/shared/components'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { getMainLayout } from '@/shared/components/layout/mainLayout/MainLayout'
import { useAddPhotoForm } from '@/widgets/addPhotoForm/hooks'
import { Post } from '@/widgets/profile/post/ui/Post'

const Home = () => {
  //const { data } = useGetPostsQuery()
  const { isPostCreated, post } = useAddPhotoForm()
  const { data } = useGetPostQuery({ id: post.id })

  console.log(isPostCreated, post, data)
  const activePost = isPostCreated && data ? <Post post={data} /> : ''

  // console.log(data?.items)
  // const posts = data?.items?.map((post: PostItemType, index: number) => {
  //   console.log(post)
  //   // return <Post key={post.id} post={post} />
  // })

  return (
    <PageWrapper>
      <HeadMeta title={'Posts'} />
      <div>Home🌼</div>
      {activePost}
      {/*{posts}*/}
    </PageWrapper>
  )
}

Home.getLayout = getMainLayout
export default Home
