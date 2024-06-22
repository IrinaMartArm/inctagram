import { TABLET_BREAKPOINT, useIsMobile } from '@/shared/assets'
import { PageWrapper } from '@/shared/components'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { getMainLayout } from '@/shared/components/layout/mainLayout/MainLayout'
import { Post } from '@/widgets/profile/post/ui/Post'

const Create = () => {
  const isMobile = useIsMobile(TABLET_BREAKPOINT)

  return (
    <PageWrapper>
      <HeadMeta title={'Create'} />
      <div></div>
    </PageWrapper>
  )
}

Create.getLayout = getMainLayout
export default Create
