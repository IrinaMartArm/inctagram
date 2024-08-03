import { useCallback, useEffect, useState } from 'react'

import { Info } from '@/features'
import { Paths } from '@/shared/assets'
import { useGetPostsByUserIdQuery } from '@/shared/assets/api/post/post-api'
import { MyPostType } from '@/shared/assets/api/post/types'
import { UserProfileResponse } from '@/shared/assets/api/profile/types'
import { UserProfile } from '@/shared/assets/api/public-user/types'
import { useTranslationPages } from '@/shared/assets/hooks'
import { Avatar, Button, Modal, Typography } from '@/shared/components'
import { Post } from '@/widgets/profile/post/ui/Post'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './profile.module.scss'

type Props = {
  isMyProfile: boolean
  myProfileData?: UserProfileResponse
  post: MyPostType
  userId: string
  userProfile: UserProfile
}

export const MyProfile = ({ isMyProfile, myProfileData, post, userId, userProfile }: Props) => {
  const { t } = useTranslationPages()
  const router = useRouter()
  const { postId } = router.query
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedPost, setSelectedPost] = useState<MyPostType | null>(null)

  const pageSize = 8
  const {
    data: posts,
    isFetching,
    isLoading,
  } = useGetPostsByUserIdQuery({
    page: page.toString(),
    pageSize: pageSize.toString(),
    userId: userId,
  })

  useEffect(() => {
    if (post) {
      setSelectedPost({
        ...post,
        images: post.images,
      })
      setIsModalOpen(true)
    }
  }, [post])

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

  return (
    <div className={s.root}>
      <div className={s.info_wrapper}>
        <div className={s.avatar}>
          <Avatar alt={userProfile?.username || ''} src={userProfile?.avatar?.url || ''} />
        </div>
        <div className={s.info_block}>
          <div className={s.first_row}>
            <Typography variant={'h1'}>{userProfile?.username || ''}</Typography>
            {isMyProfile && (
              <Button as={Link} href={Paths.PROFILE_GENERAL} variant={'secondary'}>
                {t.settingsBtn}
              </Button>
            )}
          </div>
          <div className={s.second_row}>
            <Info number={userProfile?.following} title={t.following} />
            <Info number={userProfile?.followers} title={t.followers} />
            <Info number={userProfile?.publications.length} title={t.publications} />
          </div>
          <div className={s.third_row}>
            <Typography variant={'regular_text-16'}>{userProfile?.aboutMe}</Typography>
          </div>
        </div>
      </div>
      <div className={s.posts}>
        {posts
          ? posts?.items.map(post => (
              <Modal
                className={s.modal}
                key={post.id}
                trigger={<img alt={''} className={s.postImage} src={post.images[0]} />}
              >
                <Post
                  avatar={userProfile?.avatar?.url || ''}
                  isOwner={isMyProfile}
                  post={post}
                  userId={userId}
                />
              </Modal>
            ))
          : !isLoading && <div>No posts available</div>}
        {isLoading && <div>Loading...</div>}
      </div>
      {selectedPost && (
        <Modal className={s.modal} onOpenChange={open => setIsModalOpen(open)} open={isModalOpen}>
          <Post
            avatar={userProfile?.avatar?.url || ''}
            isOwner={isMyProfile}
            post={selectedPost}
            userId={userId}
          />
        </Modal>
      )}
    </div>
  )
}
