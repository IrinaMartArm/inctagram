import React from 'react'

import { Button, Typography } from '@/shared/components'

import s from './confirmableModal.module.scss'

type ConfirmableModalProps = {
  onCancel: () => void
  onConfirm: () => void
}

export const ConfirmableModal = ({ onCancel, onConfirm }: ConfirmableModalProps) => {
  return (
    <div className={s.container}>
      <Typography variant={'regular_text-16'}>
        Do you really want to finish editing? If you close the changes you have made will not be
        saved.
      </Typography>
      <div className={s.buttonGroup}>
        <Button className={s.button} onClick={onConfirm} variant={'outlined'}>
          Yes
        </Button>
        <Button className={s.button} onClick={onCancel} variant={'primary'}>
          No
        </Button>
      </div>
    </div>
  )
}
