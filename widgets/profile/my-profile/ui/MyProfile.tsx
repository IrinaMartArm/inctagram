import { useCallback, useEffect, useState } from 'react'

import { Info } from '@/features'
import { Paths } from '@/shared/assets'
import { useMeQuery } from '@/shared/assets/api/auth/auth-api'
import { useGetPostsByUserIdQuery } from '@/shared/assets/api/post/post-api'
import { MyPostType } from '@/shared/assets/api/post/types'
import { useProfileInformationQuery } from '@/shared/assets/api/profile/profile-api'
import { usePublicPostByIdQuery } from '@/shared/assets/api/public-posts/public-posts-api'
import { useTranslationPages } from '@/shared/assets/hooks'
import { Avatar, Button, Modal, Typography } from '@/shared/components'
import { Post } from '@/widgets/profile/post/ui/Post'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './profile.module.scss'

const followingN = 746
const followersN = 345
const publicationsN = 465

export const MyProfile = () => {
  const { t } = useTranslationPages()
  const router = useRouter()
  const { id, postId } = router.query
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedPost, setSelectedPost] = useState<MyPostType | null>(null)

  const pageSize = 8
  const { data: profile } = useProfileInformationQuery()
  const { data: user } = useMeQuery()
  const {
    data: posts,
    isFetching,
    isLoading,
  } = useGetPostsByUserIdQuery({
    page: page.toString(),
    pageSize: pageSize.toString(),
    userId: typeof id === 'string' ? id : '',
  })
  const { data: publicPost } = usePublicPostByIdQuery(postId)

  useEffect(() => {
    if (publicPost) {
      setSelectedPost({
        ...publicPost,
        images: publicPost.imagesUrl,
      })
      setIsModalOpen(true)
    }
  }, [publicPost])

  const isOwner = user?.userId === id

  const loadMorePosts = useCallback(() => {
    if (!isFetching && !isLoading && posts && posts.pagesCount > page) {
      setPage(prevPage => prevPage + 1)
    }
  }, [isFetching, isLoading])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        loadMorePosts()
      }
    }

    window.addEventListener('scroll', handleScroll, { capture: true })

    return () => window.removeEventListener('scroll', handleScroll, { capture: true })
  }, [loadMorePosts])

  const handlePostClick = (post: MyPostType) => {
    setSelectedPost(post)
    setIsModalOpen(true)
  }

  // useEffect(() => {
  //   if (!isFetching && !isLoading && posts && posts.length < page * pageSize) {
  //     loadMorePosts()
  //   }
  // }, [isFetching, isLoading, posts, page, pageSize, loadMorePosts])

  const handleClosePostModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className={s.root}>
      <div className={s.info_wrapper}>
        <div className={s.avatar}>
          <Avatar alt={profile?.username || ''} src={profile?.avatar?.url || ''} />
        </div>
        <div className={s.info_block}>
          <div className={s.first_row}>
            <Typography variant={'h1'}>{profile?.username || ''}</Typography>
            {isOwner && (
              <Button as={Link} href={Paths.PROFILE_GENERAL} variant={'secondary'}>
                {t.settingsBtn}
              </Button>
            )}
          </div>
          <div className={s.second_row}>
            <Info number={followingN} title={t.following} />
            <Info number={followersN} title={t.followers} />
            <Info number={publicationsN} title={t.publications} />
          </div>
          <div className={s.third_row}>
            <Typography variant={'regular_text-16'}>{profile?.aboutMe}</Typography>
          </div>
        </div>
      </div>
      <div className={s.posts}>
        {posts && posts?.items.length > 0
          ? posts?.items.map(post => (
              <img
                alt={''}
                className={s.postImage}
                key={post.id}
                onClick={() => handlePostClick(post)}
                src={post.images[0]}
              />
            ))
          : !isLoading && <div>No posts available</div>}
        {isLoading && <div>Loading...</div>}
      </div>
      {selectedPost && (
        <Modal className={s.modal} onOpenChange={open => setIsModalOpen(open)} open={isModalOpen}>
          <Post
            avatar={profile?.avatar?.url || ''}
            onCloseModal={handleClosePostModal}
            post={selectedPost}
          />
        </Modal>
      )}
    </div>
  )
}
