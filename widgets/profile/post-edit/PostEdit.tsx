import React from 'react'
import { useForm } from 'react-hook-form'

import { useEditPostMutation } from '@/shared/assets/api/post/post-api'
import { useProfileInformationQuery } from '@/shared/assets/api/profile/profile-api'
import { useTranslation } from '@/shared/assets/hooks'
import { Avatar, Button, ControlledTextArea, Modal, Typography } from '@/shared/components'
import { ConfirmableModal } from '@/widgets/profile/post-edit/confirmableModal/ConfirmableModal'
import Image from 'next/image'

import s from './postEdit.module.scss'

type Props = {
  handleCancelConfirmModal: () => void
  isConfirmModalOpen: boolean
  onCancel: () => void
}

export const PostEdit = ({ handleCancelConfirmModal, isConfirmModalOpen, onCancel }: Props) => {
  const { data: profile } = useProfileInformationQuery()
  // const [editPost] = useEditPostMutation()
  const { control, handleSubmit, watch } = useForm()

  const onSubmit = async (data: any) => {
    // await editPost(data)
    onCancel()
  }

  const description = watch('description', '')
  const numLetters = description.length

  return (
    <>
      <div className={s.container}>
        <div className={s.imageContainer}>
          <img src={'https://via.placeholder.com/150'} />
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
                placeholder={'Description'}
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
          defaultOpen
          handleCloseClickOutside={() => {}}
          onOpenChange={handleCancelConfirmModal}
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
