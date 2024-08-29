import { NextPageWithLayout } from '@/pages/_app'
import { PublicPostResponse } from '@/shared/assets/api/public-posts/types'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { getMixLayout } from '@/shared/components/layout/mixLayout'
import { CountUsers } from '@/widgets/count-users/count-users'
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

  const [count, posts] = await Promise.all([countData.json(), postData.json()])

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
      <HeadMeta title={'Public'} />
      <main>
        <div className={'wrapper'}>
          <CountUsers countUsers={countUsers} />
          <div className={'container'}>
            {posts?.items.map(post => (
              <PublicPostCard
                avatar={post.avatar?.url}
                createdAt={post.createdAt}
                description={post.description}
                images={post.images}
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
  )
}

Public.getLayout = getMixLayout
export default Public
