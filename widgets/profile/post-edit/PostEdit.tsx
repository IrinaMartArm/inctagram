import { useForm } from 'react-hook-form'

import { useTranslationPages } from '@/shared/assets'
import { useEditPostMutation } from '@/shared/assets/api/post/post-api'
import { useProfileInformationQuery } from '@/shared/assets/api/profile/profile-api'
import { Avatar, Button, ControlledTextArea, Typography } from '@/shared/components'
import Image from 'next/image'

import s from './postEdit.module.scss'

type Props = {
  handleCancelEditModal: () => void
  postDescription: string
  postId: string
  postImg: string
}

export const PostEdit = ({ handleCancelEditModal, postDescription, postId, postImg }: Props) => {
  const { t } = useTranslationPages()
  const { data: profile } = useProfileInformationQuery()
  const [editPost] = useEditPostMutation()
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { description: postDescription },
  })

  const onSubmit = async (items: { description: string }) => {
    handleCancelEditModal()
    await editPost({ description: items.description, id: postId }).unwrap()
  }

  const description = watch('description', '')
  const numLetters = description.length
  const isDescriptionTooLong = numLetters > 500

  return (
    <>
      <div className={s.container}>
        <div className={s.imageContainer}>
          <Image alt={''} fill sizes={'100%'} src={postImg} />
        </div>
        <div className={s.formBlock}>
          <div className={s.avatarContainer}>
            <Avatar
              alt={profile?.username || ''}
              className={s.avatar}
              size={'sm'}
              src={profile?.avatar?.url}
            />
            <Typography variant={'regular_text-16'}>{profile?.username}</Typography>
          </div>
          <div></div>
          <form className={s.form} id={'descriptionForm'} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.textarea}>
              <ControlledTextArea
                className={s.textareaInput}
                control={control}
                errorMessage={isDescriptionTooLong ? t.edit.error : ''}
                label={t.edit.label}
                name={'description'}
              />
              <Typography className={s.numLettersText} variant={'small-text'}>
                {numLetters}/500
              </Typography>
            </div>
            <div className={s.button}>
              <Button disabled={isDescriptionTooLong} type={'submit'}>
                {t.edit.button}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
