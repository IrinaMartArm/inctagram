import React from 'react'

import { useTranslation } from '@/shared/assets/hooks'
import { Button, Modal, Typography } from '@/shared/components'

import s from './deletePhotoModal.module.scss'

type Props = {
  defaultOpen: boolean
  deletePhoto: () => void
  setIsShowModal: (isShowModal: boolean) => void
  text: string
  title: string
}

export const DeletePhotoModal = ({
  defaultOpen,
  deletePhoto,
  setIsShowModal,
  text,
  title,
}: Props) => {
  const { t } = useTranslation()

  return (
    <Modal open={defaultOpen} title={title}>
      <div className={s.wrapper}>
        <Typography variant={'regular_text-16'}>{text}</Typography>
        <div className={s.buttons}>
          <Button
            onClick={() => {
              deletePhoto()
              setIsShowModal(false)
            }}
            variant={'outlined'}
          >
            {t.common.yes}
          </Button>
          <Button
            onClick={() => {
              setIsShowModal(false)
            }}
          >
            {t.common.no}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
