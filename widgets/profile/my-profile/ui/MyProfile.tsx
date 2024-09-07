import { Info } from '@/features'
import { Paths } from '@/shared/assets'
import { PostType } from '@/shared/assets/api/post/types'
import { UserProfileResponse } from '@/shared/assets/api/profile/types'
import { UserProfile } from '@/shared/assets/api/subscriptions/types'
import { Avatar, Button, Modal, Typography } from '@/shared/components'
import { useProfile } from '@/widgets'
import { Post } from '@/widgets/profile/post/ui/Post'
import Link from 'next/link'

import s from './profile.module.scss'

export type MyProfileProps = {
  isOwner: boolean
  myProfileData?: UserProfileResponse
  post: PostType
  postId?: string
  publicProfile?: UserProfile
  userId: string
}

export const MyProfile = (props: MyProfileProps) => {
  const { isOwner, myProfileData, publicProfile, userId } = props
  const {
    aboutMe,
    avatar,
    closeModal,
    handlePostClick,
    isLoading,
    isModalOpen,
    postsData,
    selectedPost,
    t,
  } = useProfile(props)

  const username = isOwner ? myProfileData?.username : publicProfile?.username
  const publicationsCount = isOwner ? postsData?.totalCount : publicProfile?.publicationsCount
  const postsList = isOwner ? postsData?.items : publicProfile?.publications

  return (
    <div className={s.root}>
      <div className={s.info_wrapper}>
        <div className={s.avatar}>
          <Avatar alt={publicProfile?.username || ''} src={avatar || ''} />
        </div>
        <div className={s.info_block}>
          <div className={s.first_row}>
            <Typography variant={'h1'}>
              {publicProfile?.username || myProfileData?.username}
            </Typography>
            {isOwner && (
              <Button as={Link} href={Paths.PROFILE_GENERAL} variant={'secondary'}>
                {t.settingsBtn}
              </Button>
            )}
          </div>
          <div className={s.second_row}>
            <Info number={publicProfile?.following || 0} title={t.following} />
            <Info number={publicProfile?.followers || 0} title={t.followers} />
            <Info number={publicationsCount || 0} title={t.publications} />
          </div>
          <div className={s.third_row}>
            <Typography variant={'regular_text-16'}>{aboutMe}</Typography>
          </div>
        </div>
      </div>
      <div className={s.posts}>
        {postsList
          ? postsList.map(post => (
              <div
                className={s.postImage}
                key={post.id}
                onClick={() => handlePostClick(post as PostType)}
              >
                <img alt={'post'} className={s.postImageInner} src={post.images[0]} />
                {post.images.length > 1 && (
                  <Typography className={s.badgeImage} variant={'regular_text-14'}>
                    {post.images.length}
                  </Typography>
                )}
              </div>
            ))
          : !isLoading && <div>No posts available</div>}
        {isLoading && <div>Loading...</div>}
      </div>

      {isModalOpen && selectedPost && (
        <Modal
          className={s.modal}
          // onClose={closeModal}
          onOpenChange={closeModal}
          open={isModalOpen}
        >
          <Post
            avatar={avatar || ''}
            isOwner={isOwner}
            post={selectedPost}
            userId={userId}
            username={username}
          />
        </Modal>
      )}
    </div>
  )
}
