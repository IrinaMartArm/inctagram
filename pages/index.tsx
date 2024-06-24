import { isAuthSelector } from '@/entities'
import { NextPageWithLayout } from '@/pages/_app'
import { usePublicPostsQuery } from '@/shared/assets/api/public-posts/public-posts-api'
import { PublicPostByIdResponse } from '@/shared/assets/api/public-posts/types'
import { usePublicUsersQuery } from '@/shared/assets/api/public-user/public-user-api'
import { useAppSelector } from '@/shared/assets/api/store'
import { PageWrapper } from '@/shared/components'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { getLayout } from '@/shared/components/layout/baseLayout/BaseLayout'
import { Header } from '@/widgets/header/Header'
import { PublicPostCard } from '@/widgets/public-post-card/PublicPostCard'

const Public: NextPageWithLayout = () => {
  const isAuth = useAppSelector(isAuthSelector)

  const { data: posts } = usePublicPostsQuery()
  // const { data: user } = usePublicUsersQuery()

  console.log('publicPosts', posts)
  // console.log('publicUser', user)

  return (
    <>
      {/*<PageWrapper>*/}
      <HeadMeta title={'Public'} />
      <Header isAuth={isAuth} />
      <main>
        <div className={'container'}>
          {posts?.items.map((post: PublicPostByIdResponse) => (
            <PublicPostCard
              createdAt={post.createdAt}
              description={post.description}
              imagesUrl={post.imagesUrl}
              key={post.id}
            />
          ))}
        </div>
      </main>
    </>
    // </PageWrapper>
  )
}

Public.getLayout = getLayout
export default Public
