import { Info } from '@/features'
import { Paths } from '@/shared/assets'
import { PostType } from '@/shared/assets/api/post/types'
import { UserProfileResponse } from '@/shared/assets/api/profile/types'
import { UserProfile } from '@/shared/assets/api/public-user/types'
import { Avatar, Button, Modal, Typography } from '@/shared/components'
import { useProfile } from '@/widgets'
import { Post } from '@/widgets/profile/post/ui/Post'
import Link from 'next/link'

import s from './profile.module.scss'

export type MyProfileProps = {
  isMyProfile: boolean
  myProfileData?: UserProfileResponse
  post: PostType
  userId: string
  userProfile: UserProfile
}

export const MyProfile = (props: MyProfileProps) => {
  const { isMyProfile, userId, userProfile } = props
  const { avatar, isLoading, isModalOpen, posts, selectedPost, setIsModalOpen, t } =
    useProfile(props)

  return (
    <div className={s.root}>
      <div className={s.info_wrapper}>
        <div className={s.avatar}>
          <Avatar alt={userProfile?.username || ''} src={avatar || ''} />
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
                <Post avatar={avatar || ''} isOwner={isMyProfile} post={post} userId={userId} />
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
