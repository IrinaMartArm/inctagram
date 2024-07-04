import { useForm } from 'react-hook-form'

import { Bookmark_outline, HeartOutline, HeartRed, HeartSmall, PaperPlane } from '@/public'
import { PostItemTypeRes } from '@/shared/assets/api/post/types'
import { AvatarSimple, Button, ControlledTextField, Typography } from '@/shared/components'
import { PhotoCarousel } from '@/shared/components/photoCarousel/PhotoCarousel'
import { PostMenu } from '@/widgets/profile/post/ui/PostMenu'

import s from './post.module.scss'
type Props = {
  key?: number
  post: PostItemTypeRes
}
export const Post = ({ post }: Props) => {
  const isOwner = true
  const avatars = ['', '', '']

  const { control, handleSubmit, reset } = useForm({})

  return (
    <div className={s.root}>
      <div className={s.imgWrapper}>
        <PhotoCarousel photos={post?.imagesUrl} />
      </div>
      <div className={s.postInfoWrapper}>
        <div className={s.header}>
          <div className={s.content}>
            <AvatarSimple title={'me'} />
            <Typography variant={'h3'}>{post?.username}</Typography>
          </div>
          {isOwner && <PostMenu postId={post.id} />}
        </div>
        <div className={s.contentWrapper}>
          <div className={s.content}>
            <AvatarSimple title={'me'} />
            <Typography variant={'h3'}>Lorem</Typography>
          </div>
          <div className={s.content}>
            <AvatarSimple title={'me'} />
            <div className={s.comment}>
              <div className={s.contentInner}>
                <Typography variant={'h3'}>Lorem</Typography>
                <Button icon={<HeartSmall />} onClick={() => {
                }} variant={'icon'} />
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
                <Typography variant={'h3'}>Lorem</Typography>
                <Button icon={<HeartRed />} onClick={() => {
                }} variant={'icon'} />
              </div>
              <Typography className={s.grey} variant={'small-text'}>
                2 hours ago
              </Typography>
            </div>
          </div>
        </div>
        <div className={s.bottomBlock}>
          <div className={s.icons}>
            <div>
              <HeartOutline />
              <PaperPlane />
            </div>
            <Bookmark_outline />
          </div>
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
            July 3, 2021
          </Typography>
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
        </div>
      </div>
    </div>
  )
}
