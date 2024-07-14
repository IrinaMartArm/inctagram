import React from 'react'
import { useForm } from 'react-hook-form'

import { useEditPostMutation } from '@/shared/assets/api/post/post-api'
import { useProfileInformationQuery } from '@/shared/assets/api/profile/profile-api'
import { Avatar, Button, ControlledTextArea, Modal, Typography } from '@/shared/components'
import { ConfirmableModal } from '@/widgets/profile/post-edit/confirmableModal/ConfirmableModal'
import Image from 'next/image'

import s from './postEdit.module.scss'

type Props = {
  handleCancelConfirmModal: () => void
  isConfirmModalOpen: boolean
  onCancel: () => void
  onDescriptionUpdate: (newDescription: string) => void
  postDescription: string
  postId: string
  postImg: string
}

export const PostEdit = ({
  handleCancelConfirmModal,
  isConfirmModalOpen,
  onCancel,
  onDescriptionUpdate,
  postDescription,
  postId,
  postImg,
}: Props) => {
  const { data: profile } = useProfileInformationQuery()
  const [editPost] = useEditPostMutation()
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { description: postDescription },
  })

  const onSubmit = async (data: { description: string }) => {
    await editPost({ description: data.description, id: postId }).unwrap()
    onDescriptionUpdate(data.description)
    onCancel()
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
          <form className={s.form} id={'descriptionForm'} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.textarea}>
              <ControlledTextArea
                autoComplete={'description'}
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

      {isConfirmModalOpen && (
        <Modal
          handleCloseClickOutside={() => {}}
          onOpenChange={handleCancelConfirmModal}
          open={isConfirmModalOpen}
          title={'Close Post'}
        >
          <ConfirmableModal
            onCancel={handleCancelConfirmModal}
            onConfirm={() => {
              handleCancelConfirmModal()
              onCancel()
            }}
          />
        </Modal>
      )}
    </>
  )
}
