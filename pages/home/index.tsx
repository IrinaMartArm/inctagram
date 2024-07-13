import { useEffect, useState } from 'react'

import { PageWrapper } from '@/shared/components'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { getMainLayout } from '@/shared/components/layout/mainLayout/MainLayout'

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
