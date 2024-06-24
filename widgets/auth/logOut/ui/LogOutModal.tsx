import { LogOut_outline } from '@/public'
import { Button, Modal, ModalClose, ModalWindow, Typography } from '@/shared/components'
import { useLogOut } from '@/widgets'

import s from './logOutModal.module.scss'

type Props = {
  email?: string
}
export const LogOutModal = ({ email }: Props) => {
  const { logOutCallback, t } = useLogOut()

  return (
    <Modal
      title={t.logOut.title}
      trigger={
        <Button className={s.trigger} variant={'link'}>
          <LogOut_outline />
          <Typography variant={'Medium_text-14'}>{t.logOut.title}</Typography>
        </Button>
      }
    >
      <ModalWindow callback={logOutCallback} text={t.logOut.warning} text_2={email ?? ''} />
    </Modal>
  )
}
