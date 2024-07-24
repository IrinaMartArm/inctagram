import { useCallback, useEffect, useState } from 'react'

import { Info } from '@/features'
import { Paths } from '@/shared/assets'
import { useGetPostsByUserIdQuery } from '@/shared/assets/api/post/post-api'
import { useProfileInformationQuery } from '@/shared/assets/api/profile/profile-api'
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
  const { id } = router.query
  const [page, setPage] = useState(1)
  const pageSize = 8
  const { data: profile } = useProfileInformationQuery()
  const {
    data: posts,
    isFetching,
    isLoading,
  } = useGetPostsByUserIdQuery({
    page: page.toString(),
    pageSize: pageSize.toString(),
    userId: typeof id === 'string' ? id : '',
  })

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

  return (
    <div className={s.root}>
      <div className={s.info_wrapper}>
        <div className={s.avatar}>
          <Avatar alt={profile?.username || ''} src={profile?.avatar?.url || ''} />
        </div>
        <div className={s.info_block}>
          <div className={s.first_row}>
            <Typography variant={'h1'}>{profile?.username || ''}</Typography>
            <Button as={Link} href={Paths.PROFILE_GENERAL} variant={'secondary'}>
              {t.settingsBtn}
            </Button>
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
        {posts
          ? posts?.items.map(post => (
              <Modal
                className={s.modal}
                key={post.id}
                trigger={<img alt={''} className={s.postImage} src={post.images[0]} />}
              >
                <Post avatar={profile?.avatar?.url || ''} post={post} />
              </Modal>
            ))
          : !isLoading && <div>No posts available</div>}
        {isLoading && <div>Loading...</div>}
      </div>
    </div>
  )
}
