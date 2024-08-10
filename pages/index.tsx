import { isAuthSelector } from '@/entities'
import { NextPageWithLayout } from '@/pages/_app'
import { PublicPostResponse } from '@/shared/assets/api/public-posts/types'
import { UserProfile } from '@/shared/assets/api/public-user/types'
import { useAppSelector } from '@/shared/assets/api/store'
import { PageWrapper } from '@/shared/components'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { getLayout } from '@/shared/components/layout/baseLayout/BaseLayout'
import { getMixLayout } from '@/shared/components/layout/mixLayout'
import { CountUsers } from '@/widgets/count-users/count-users'
import { Header } from '@/widgets/header/Header'
import { PublicPostCard } from '@/widgets/public-post-card/PublicPostCard'
import { NextPageContext } from 'next'

type Props = {
  countUsers: number
  posts: PublicPostResponse
}

export const getStaticProps = async (context: NextPageContext) => {
  const { query } = context
  const pageSize = query?.pageSize || 4
  const page = query?.page || 1

  const [countData, postData] = await Promise.all([
    fetch('https://inctagram.org/api/v1/public-user'),
    fetch(`https://inctagram.org/api/v1/public-posts?page=${page}&pageSize=${pageSize}`),
  ])

  const count = await countData.json()
  const posts = await postData.json()

  return {
    props: {
      countUsers: count.totalCount,
      posts,
    },
    revalidate: 60,
  }
}

const Public: NextPageWithLayout<Props> = ({ countUsers, posts }) => {
  return (
    <>
      {/*<PageWrapper>*/}
      <HeadMeta title={'Public'} />
      <main>
        <div className={'wrapper'}>
          <CountUsers countUsers={countUsers} />
          <div className={'container'}>
            {posts?.items.map(post => (
              <PublicPostCard
                avatarUrl={post.avatar?.url}
                createdAt={post.createdAt}
                description={post.description}
                imagesUrl={post.imagesUrl}
                key={post.id}
                postId={post.id}
                userId={post.authorId}
                username={post.username}
              />
            ))}
          </div>
        </div>
      </main>
    </>
    // </PageWrapper>
  )
}

Public.getLayout = getMixLayout
export default Public
