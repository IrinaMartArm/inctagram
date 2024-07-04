import { useState } from 'react'

import { useGetPostQuery, useGetPostsQuery } from '@/shared/assets/api/post/post-api'
import { PostItemType } from '@/shared/assets/api/post/types'
import { PageWrapper } from '@/shared/components'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { getMainLayout } from '@/shared/components/layout/mainLayout/MainLayout'
import { useAddPhotoForm } from '@/widgets/addPhotoForm/hooks'
import { Post } from '@/widgets/profile/post/ui/Post'

const Home = () => {


  return (
    <PageWrapper>
      <HeadMeta title={'Posts'} />
      <div>Home🌼</div>
    </PageWrapper>
  )
}

Home.getLayout = getMainLayout
export default Home
