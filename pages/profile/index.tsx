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
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store => async context => {
    const { data: user } = useMeQuery()
    const id = context.query.id
    const postId = context.query.postId

    const isMyProfile = id === user?.userId

    const userProfile = await store.dispatch(getPublicUsers.initiate({ userId: +id! }))

    let myProfileData = null

    if (isMyProfile) {
      myProfileData = await store.dispatch(profileInformation.initiate())

      if (!myProfileData.data) {
        return { notFound: true }
      }
    }

    let post = null

    if (postId) {
      post = await store.dispatch(getPublicPostById.initiate({ postId: +postId! }))

      if (!post.data) {
        return { notFound: true }
      }
    }

    if (!userProfile) {
      return {
        notFound: true,
      }
    }
    await Promise.all(store.dispatch(baseApi.util.getRunningQueriesThunk()))

    return {
      props: { isMyProfile, myProfileData: myProfileData || null, post, userProfile },
    }
  }
)

const Profile = ({
  isMyProfile,
  myProfileData,
  post,
  userProfile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <PageWrapper>
      <HeadMeta title={'Profile'} />
      <MyProfile
        isMyProfile={isMyProfile}
        myProfileData={myProfileData}
        post={post}
        userProfile={userProfile}
      />
    </PageWrapper>
  )
}

Profile.getLayout = getMixLayout
export default Profile
