import React, { useState } from 'react'

import { Edit, More, Trash } from '@/public'
import { useTranslationPages } from '@/shared/assets'
import { useDeletePostMutation } from '@/shared/assets/api/post/post-api'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Modal,
  ModalWindow,
} from '@/shared/components'
import { PostEdit } from '@/widgets/profile/post-edit/PostEdit'

import d from '@/shared/components/dropDownMenu/dropDown.module.scss'
import s from '@/widgets/profile/post/ui/post.module.scss'

type Props = {
  onDescriptionUpdate: (newDescription: string) => void
  postDescription: string
  postId: string
  postImg: string
}

export const PostMenu = ({ onDescriptionUpdate, postDescription, postId, postImg }: Props) => {
  const { t } = useTranslationPages()
  const [deletePost] = useDeletePostMutation()
  const [open, setOpen] = useState(false)
  const onOpenChangeHandler = () => {
    setOpen(!open)
  }

  const handleDeletePost = async () => {
    deletePost({ id: postId }).unwrap()
  }

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const handlePostEdit = () => {
    setOpen(false)
    setIsEditModalOpen(true)
  }

  const handleOpenConfirmModal = () => {
    setIsConfirmModalOpen(true)
  }

  const handleCancelConfirmModal = () => {
    setIsConfirmModalOpen(false)
  }

  const handleDescriptionUpdate = (newDescription: string) => {
    onDescriptionUpdate(newDescription)
    setIsEditModalOpen(false)
  }

  return (
    <>
      <DropdownMenu onOpenChange={onOpenChangeHandler} open={open}>
        <DropdownMenuTrigger>
          <More />
        </DropdownMenuTrigger>
        <DropdownMenuContent align={'end'}>
          <DropdownMenuItem asChild>
            <Button className={d.item} icon={<Edit />} onClick={handlePostEdit} variant={'icon'}>
              {t.post.editPost}
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Modal
              title={'Delete Post'}
              trigger={
                <Button className={d.item} icon={<Trash />} variant={'icon'}>
                  {t.post.deletePost}
                </Button>
              }
            >
              <ModalWindow callback={handleDeletePost} text={t.post.text} />
            </Modal>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isEditModalOpen && (
        <Modal
          className={s.modalPostEdit}
          handleCloseClickButton={handleOpenConfirmModal}
          handleCloseClickOutside={handleOpenConfirmModal}
          open={isEditModalOpen}
          title={'Edit Post'}
        >
          <PostEdit
            handleCancelConfirmModal={handleCancelConfirmModal}
            isConfirmModalOpen={isConfirmModalOpen}
            onCancel={() => setIsEditModalOpen(false)}
            onDescriptionUpdate={handleDescriptionUpdate}
            postDescription={postDescription}
            postId={postId}
            postImg={postImg}
          />
        </Modal>
      )}
    </>
  )
}
