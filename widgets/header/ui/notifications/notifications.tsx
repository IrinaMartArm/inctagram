import { Bell } from '@/public'
import { Button } from '@/shared/components'

import s from './notifications.module.scss'

type Props = {
  notificationsCount?: number
}

export const Notifications = ({ notificationsCount = 0 }: Props) => {
  const isShowMessagesCont = notificationsCount > 0

  return (
    <Button className={s.wrapper} variant={'icon'}>
      {isShowMessagesCont && <div className={s.notifications}>{notificationsCount}</div>}
      <Bell />
    </Button>
  )
}
