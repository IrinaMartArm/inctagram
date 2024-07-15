import React from 'react'
import { useForm } from 'react-hook-form'

import { Trash } from '@/public'
import { useTranslation } from '@/shared/assets'
import { useEditPostMutation } from '@/shared/assets/api/post/post-api'
import { useProfileInformationQuery } from '@/shared/assets/api/profile/profile-api'
import {
  Avatar,
  Button,
  ControlledTextArea,
  Modal,
  ModalWindow,
  Typography,
} from '@/shared/components'
import Image from 'next/image'

import s from './postEdit.module.scss'

type Props = {
  handleCancelConfirmModal: () => void
  handleCancelEditModal: () => void
  isConfirmModalOpen: boolean
  postDescription: string
  postId: string
  postImg: string
}

export const PostEdit = ({
  handleCancelConfirmModal,
  handleCancelEditModal,
  isConfirmModalOpen,
  postDescription,
  postId,
  postImg,
}: Props) => {
  const { t } = useTranslation()
  const { data: profile } = useProfileInformationQuery()
  const [editPost] = useEditPostMutation()
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { description: postDescription },
  })

  const onSubmit = async (items: { description: string }) => {
    await editPost({ description: items.description, id: postId }).unwrap()
    handleCancelEditModal()
  }

  const description = watch('description', '')
  const numLetters = description.length

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
                label={'Add publication descriptions'}
                name={'description'}
              />
              <Typography className={s.numLettersText} variant={'small-text'}>
                {numLetters}/500
              </Typography>
            </div>
            <div className={s.button}>
              <Button type={'submit'}>{'Save Changes'}</Button>
            </div>
          </form>
        </div>
      </div>

      <Modal onOpenChange={handleCancelConfirmModal} open={isConfirmModalOpen} title={'Close Post'}>
        <ModalWindow
          callback={() => {
            handleCancelConfirmModal()
            handleCancelEditModal()
          }}
          text={
            'Do you really want to finish editing? If you close the changes you have made will not be saved.'
          }
        />
      </Modal>
    </>
  )
}
