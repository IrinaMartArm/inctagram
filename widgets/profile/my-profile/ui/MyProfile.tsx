import { Info } from '@/features'
import { Paths } from '@/shared/assets'
import { useMeQuery } from '@/shared/assets/api/auth/auth-api'
import { useGetPostQuery, useGetPostsByUserIdQuery } from '@/shared/assets/api/post/post-api'
import { useProfileInformationQuery } from '@/shared/assets/api/profile/profile-api'
import { useTranslationPages } from '@/shared/assets/hooks'
import { Avatar, Button, Modal, Typography } from '@/shared/components'
import { useAddPhotoForm } from '@/widgets/addPhotoForm/hooks'
import { Post } from '@/widgets/profile/post/ui/Post'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './profile.module.scss'

const followingN = 746
const followersN = 345
const publicationsN = 465

export const MyProfile = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: profile } = useProfileInformationQuery()
  const { t } = useTranslationPages()
  const { isPostCreated, post } = useAddPhotoForm()

  const { data: posts } = useGetPostsByUserIdQuery({ userId: typeof id === 'string' ? id : '' })

  console.log(posts)

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
            <Typography variant={'regular_text-16'}>
              {profile?.aboutMe || t.aboutMePlaceholder}
            </Typography>
          </div>
        </div>
      </div>
      <div className={s.posts}>
        {posts &&
          posts?.map(post => {
            return (
              <Modal
                className={s.modal}
                key={post.id}
                trigger={<img alt={''} className={s.postImage} src={post.imagesUrl[0]} />}
              ></Modal>
            )
          })}
        {/*<Modal className={s.modal} trigger={*/}
        {/*  */}
        {/*}>*/}
        {/*  <div></div>*/}
        {/*</Modal>*/}
      </div>
    </div>
  )
}
