import { useAppDispatch } from '@/bll/store'
import { addPhotoActions } from '@/entities'
import { Paths } from '@/shared/assets'
import { Button, Modal, ModalClose, Typography } from '@/shared/components'
import { useAddPhotoForm } from '@/widgets/addPhotoForm/hooks'
import { useRouter } from 'next/router'

import s from './confirmableModal.module.scss'
type Props = {
  confirmOpen: string
  setConfirmOpen: (val: string) => void
  setOpen: (val: boolean) => void
  toggleModal: (val: boolean) => void
}
export const ConfirmableModal = ({ confirmOpen, setConfirmOpen, setOpen, toggleModal }: Props) => {
  const router = useRouter()
  const { t } = useAddPhotoForm()
  const dispatch = useAppDispatch()
  const handleConfirmClose = () => {
    if (confirmOpen === 'outside') {
      dispatch(addPhotoActions.discardAll())
      setOpen(false)
      setConfirmOpen('')
    } else if (confirmOpen === 'back') {
      dispatch(addPhotoActions.setModalStateTo('add-photo'))
      setConfirmOpen('')
    }
  }

  const handleCancelClose = () => {
    if (confirmOpen === 'outside') {
      void router.push(Paths.HOME)
      setConfirmOpen('')
      toggleModal(false)
    } else if (confirmOpen[1] === 'back') {
      setConfirmOpen('')
    }
  }
  const handleSetConfirmOpen = (close: boolean) => {
    setConfirmOpen('')
  }

  return (
    <Modal
      className={s.modal}
      onOpenChange={handleSetConfirmOpen}
      open={!!confirmOpen}
      title={t.addPhotoForm.close}
    >
      <div className={s.root}>
        <Typography variant={'regular_text-16'}>
          {confirmOpen == 'outside' ? t.addPhotoForm.warningQ : t.addPhotoForm.attentionA}
        </Typography>
        <br />
        <Typography variant={'regular_text-16'}>{t.addPhotoForm.warningR}</Typography>
        <div className={s.controller}>
          <Button onClick={handleConfirmClose} variant={'outlined'}>
            <Typography variant={'h3'}>{t.addPhotoForm.discard}</Typography>
          </Button>
          <ModalClose>
            <Button onClick={handleCancelClose}>
              <Typography variant={'h3'}>{t.addPhotoForm.saveDraft}</Typography>
            </Button>
          </ModalClose>
        </div>
      </div>
    </Modal>
  )
}
