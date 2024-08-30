import { useForm } from 'react-hook-form'

import { Bookmark_outline, HeartOutline, HeartRed, HeartSmall, PaperPlane } from '@/public'
import { formatDate } from '@/shared/assets'
import { PostType } from '@/shared/assets/api/post/types'
import { AvatarSimple, Button, ControlledTextField, Typography } from '@/shared/components'
import { PhotoCarousel } from '@/shared/components/photoCarousel/PhotoCarousel'
import { PostMenu } from '@/widgets/profile/post/ui/PostMenu'

import s from './post.module.scss'
import { Publication } from '@/shared/assets/api/subscriptions/types'

type Props = {
  avatar: string
  isOwner: boolean
  key?: number
  post: PostType | Publication
  userId: string
  username?: string
}

export const Post = ({ avatar, isOwner, post, userId, username }: Props) => {
  const avatars = ['', '', '']

  const { control } = useForm({})

  const createdAt = formatDate(post.createdAt)

  return (
    <div className={s.root}>
      <div className={s.imgWrapper}>
        <PhotoCarousel photos={post?.images} />
      </div>
      <div className={s.postInfoWrapper}>
        <div className={s.header}>
          <div className={s.content}>
            <AvatarSimple src={avatar} title={'me'} />
            <Typography variant={'h3'}>{username}</Typography>
          </div>
          {isOwner && (
            <PostMenu
              postDescription={post.description}
              postId={post.id}
              postImg={post?.images[0]}
              userId={userId}
            />
          )}
        </div>
        <div className={s.contentWrapper}>
          <div className={s.content}>
            <AvatarSimple src={avatar} title={'me'} />
            <div className={s.content_text}>
              <Typography as={'div'} variant={'h3'}>
                {post.description}
              </Typography>
            </div>
          </div>
          <div className={s.content}>
            <AvatarSimple title={'me'} />
            <div className={s.comment}>
              <div className={s.contentInner}>
                <div className={s.content_text}>
                  <Typography variant={'h3'}>Lorem</Typography>
                </div>
                {isOwner && <Button icon={<HeartSmall />} onClick={() => {}} variant={'icon'} />}
              </div>
              <Typography className={s.grey} variant={'small-text'}>
                2 hours ago
              </Typography>
            </div>
          </div>
          <div className={s.content}>
            <AvatarSimple title={'me'} />
            <div className={s.comment}>
              <div className={s.contentInner}>
                <div className={s.content_text}>
                  <Typography variant={'h3'}>Lorem</Typography>
                </div>
                {isOwner && <Button icon={<HeartRed />} onClick={() => {}} variant={'icon'} />}
              </div>
              <Typography className={s.grey} variant={'small-text'}>
                2 hours ago
              </Typography>
            </div>
          </div>
        </div>
        <div className={s.bottomBlock}>
          {isOwner && (
            <div className={s.icons}>
              <div>
                <HeartOutline />
                <PaperPlane />
              </div>
              <Bookmark_outline />
            </div>
          )}
          <div className={s.avatars}>
            <div className={s.avatar_container}>
              {avatars.map((el, index) => (
                <div className={s.avatar} key={index} style={{ zIndex: avatars.length - index }}>
                  <AvatarSimple className={s.border} size={'small'} src={el} title={''} />
                </div>
              ))}
            </div>
            <Typography variant={'regular_text-14'}>
              {2876}
              {'  '}
              {'Like'}
            </Typography>
          </div>
          <Typography className={s.grey} variant={'small-text'}>
            {createdAt}
          </Typography>
          {isOwner && (
            <form className={s.input}>
              <ControlledTextField
                control={control}
                name={'comment'}
                placeholder={'Add a Comment...'}
                type={'text'}
              />
              <Button className={s.publish} variant={'icon'}>
                Publish
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
