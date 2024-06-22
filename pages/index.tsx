import { isAuthSelector } from '@/entities'
import { NextPageWithLayout } from '@/pages/_app'
import { useAppSelector } from '@/shared/assets/api/store'
import { PageWrapper } from '@/shared/components'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { getLayout } from '@/shared/components/layout/baseLayout/BaseLayout'
import { Header } from '@/widgets/header/Header'

const Public: NextPageWithLayout = () => {
  const isAuth = useAppSelector(isAuthSelector)

  return (
    <PageWrapper>
      <HeadMeta title={'Public'} />
      <Header isAuth={isAuth} />
      <main>🚀Hi everyone!🚀</main>
    </PageWrapper>
  )
}

Public.getLayout = getLayout
export default Public
