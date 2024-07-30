import { baseApi } from '@/shared/assets'
import { useMeQuery } from '@/shared/assets/api/auth/auth-api'
import { profileInformation } from '@/shared/assets/api/profile/profile-api'
import { getPublicPostById } from '@/shared/assets/api/public-posts/public-posts-api'
import { getPublicUsers } from '@/shared/assets/api/public-user/public-user-api'
import { wrapper } from '@/shared/assets/api/store'
import { PageWrapper } from '@/shared/components'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { getMixLayout } from '@/shared/components/layout/mixLayout'
import { MyProfile } from '@/widgets'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store => async context => {
    const { data: user } = useMeQuery()
    const id = context.query.id
    const postId = context.query.postId

    const isMyProfile = id === user?.userId

    const result = await store.dispatch(getPublicUsers.initiate({ username }))

    if (isMyProfile) {
      const response = await store.dispatch(profileInformation.initiate())

      if (!response.data) {
        return { notFound: true }
      }
    }

    if (postId) {
      const response = await store.dispatch(getPublicPostById.initiate({ postId: +postId! }))

      if (!response.data) {
        return { notFound: true }
      }
    }

    if (!result) {
      return {
        notFound: true,
      }
    }
    await Promise.all(store.dispatch(baseApi.util.getRunningQueriesThunk()))

    return {
      props: { isMyProfile, result },
    }
  }
)

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
