import { Bell } from '@/public'
import { useTimeAgo } from '@/shared/assets/hooks/useTimeAgo'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Typography,
} from '@/shared/components'

import s from './notifications.module.scss'

type Props = {
  notificationsCount?: number
}

export const Notifications = ({ notificationsCount = 0 }: Props) => {
  const isShowMessagesCont = notificationsCount > 0

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className={s.wrapper} variant={'icon'}>
          {isShowMessagesCont && <div className={s.notifications}>{notificationsCount}</div>}
          <Bell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Typography variant={'Medium_text-14'}>Уведомления</Typography>
        <div>
          <DropdownMenuItem onClick={() => {}}>
            <NotificationItem />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>
            <NotificationItem />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>
            <NotificationItem />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type NotificationItemProps = {
  expiredAt: string
  expiredNotification: string
  timeAgo: string
}

const NotificationItem = ({ expiredAt, expiredNotification, timeAgo }: NotificationItemProps) => {
  const notificationText = {
    activated: 'Ваша подписка активирована и действует до xx.yy.zzzz',
    expiredAutoRenewal: 'Следующее платеж у вас спишется через 1 день',
    expiredOneDay: 'Ваша подписка истекает через 1 день',
    expiredSevenDays: 'Ваша подписка истекает через 7 дней',
  }

  const expiredAtDays = {
    activated: 0,
    expiredAutoRenewal: 1,
    expiredOneDay: 1,
    expiredSevenDays: 7,
  }

  return (
    <div className={s.notificationItem}>
      <div className={s.notificationItemTitle}>
        <Typography variant={'Medium_text-14'}>Новое уведомление!</Typography>
        <Typography variant={'small-text'}>Новое</Typography>
      </div>
      <div className={s.notificationItemContent}>
        <Typography className={s.notificationText} variant={'regular_text-14'}>
          {notificationText.activated}
        </Typography>
        <Typography className={s.notificationText} variant={'regular_text-14'}>
          {notificationText.expiredAutoRenewal}
        </Typography>
        <Typography className={s.notificationText} variant={'regular_text-14'}>
          {notificationText.expiredSevenDays}
        </Typography>
        <Typography className={s.notificationText} variant={'regular_text-14'}>
          {notificationText.expiredOneDay}
        </Typography>
        <Typography className={s.notificationText} variant={'small-text'}>
          {useTimeAgo(timeAgo)}
        </Typography>
      </div>
    </div>
  )
}
