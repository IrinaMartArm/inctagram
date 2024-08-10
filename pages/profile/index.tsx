import { baseApi } from '@/shared/assets'
import { useMeQuery } from '@/shared/assets/api/auth/auth-api'
import { useProfileInformationQuery } from '@/shared/assets/api/profile/profile-api'
import { getPublicPostById } from '@/shared/assets/api/public-posts/public-posts-api'
import { getPublicUser } from '@/shared/assets/api/public-user/public-user-api'
import { wrapper } from '@/shared/assets/api/store'
import { PageWrapper } from '@/shared/components'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { getMixLayout } from '@/shared/components/layout/mixLayout'
import { MyProfile } from '@/widgets'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store => async context => {
    const id = context.query.id
    const postId = context.query.postId

    // const userProfile = await store.dispatch(getPublicUser.initiate({ userId: id![0] }))
    const userProfile = await fetch(`https://inctagram.org/api/v1/public-user/${id}`)

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
      props: {
        post: post || null,
        userId: id,
        userProfile: userProfile.data || null,
      },
    }
  }
)

const Profile = ({
  post,
  userId,
  userProfile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { query } = useRouter()
  const { data: user } = useMeQuery(undefined)
  const { data } = useProfileInformationQuery()
  const isMyProfile = query.id === user?.userId

  console.log('userProfile', userProfile)

  return (
    <PageWrapper>
      <HeadMeta title={'Profile'} />
      <MyProfile
        isMyProfile={isMyProfile}
        myProfileData={data}
        post={post || null}
        publicProfile={userProfile || null}
        userId={userId}
      />
    </PageWrapper>
  )
}

Profile.getLayout = getMixLayout
export default Profile
