import { PageWrapper } from '@/shared/components'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { getMixLayout } from '@/shared/components/layout/mixLayout'
import { MyProfile } from '@/widgets'

const Profile = () => {
  return (
    <PageWrapper>
      <HeadMeta title={'Profile'} />
      <MyProfile />
    </PageWrapper>
  )
}

Profile.getLayout = getMixLayout
export default Profile
