import { PageWrapper } from '@/shared/components'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { getMainLayout } from '@/shared/components/layout/mainLayout/MainLayout'
import { MyProfile } from '@/widgets'
import { useRouter } from 'next/router'

const Profile = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <PageWrapper>
      <HeadMeta title={'Profile'} />
      {id ? <p>User ID: {id}</p> : <p>Loading...</p>}
      <MyProfile />
    </PageWrapper>
  )
}

Profile.getLayout = getMainLayout
export default Profile
