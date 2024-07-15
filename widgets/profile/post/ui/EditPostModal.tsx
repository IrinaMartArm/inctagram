import { useForm } from 'react-hook-form'

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

import s from './editpost.module.scss'

export const EditPostModal = ({ postId, postImg }) => {
  const { data: profile } = useProfileInformationQuery()
  const [editPost] = useEditPostMutation()
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { description: 'postDescription' },
  })

  const onSubmit = async (data: { description: string }) => {
    await editPost({ description: data.description, id: postId }).unwrap()
  }

  // const description = watch('description', '')
  // const numLetters = description.length

  return (
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
              {'kkk'}
            </Typography>
          </div>
          <Modal
            title={'Save Changes'}
            trigger={
              <div className={s.button}>
                <Button type={'submit'}>{'Save Changes'}</Button>
              </div>
            }
          >
            <ModalWindow callback={() => {}} text={'t.post.text'} />
          </Modal>
        </form>
      </div>
    </div>
  )
}
