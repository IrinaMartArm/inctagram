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
  users: Record<string, UserProfile>
}

export const getStaticProps = async (context: NextPageContext) => {
  const { query } = context
  const pageSize = query?.pageSize || 4
  const page = query?.page || 1

  const count = await fetch('https://inctagram.org/api/v1/public-user')

  const postData = await fetch(
    `https://inctagram.org/api/v1/public-posts?page=${page}&pageSize=${pageSize}`
  )

  const countData = await count.json()
  const posts = await postData.json()

  const users: Record<string, UserProfile> = {}

  for (const post of posts.items) {
    if (!users[post.username]) {
      const userData = await fetch(`https://inctagram.org/api/v1/public-user/${post.username}`)

      users[post.username] = await userData.json()
    }
  }

  return {
    props: {
      countUsers: countData.totalCount,
      posts,
      users,
    },
    revalidate: 60,
  }
}

const Public: NextPageWithLayout<Props> = ({ countUsers, posts, users }) => {
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
                userId={post.authorId}
                postId={post.id}
                avatarUrl={users[post.username]?.avatar?.url}
                createdAt={post.createdAt}
                description={post.description}
                imagesUrl={post.imagesUrl}
                key={post.id}
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
