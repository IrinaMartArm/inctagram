import { NotificationData } from '@/shared/assets/api/notifications/types'
import { useTimeAgo } from '@/shared/assets/hooks/useTimeAgo'
import { Typography } from '@/shared/components'
import { clsx } from 'clsx'

import s from '@/widgets/header/ui/notifications/notification-item/notification-item.module.scss'

type NotificationItemProps = NotificationData

export const NotificationItem = ({
  createdAt,
  id,
  isRead,
  message,
  userId,
}: NotificationItemProps) => {
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

  // export const messageForOneDay = 'Your subscription expires in 1 day'
  // export const messageForSevenDay = 'Your subscription expires in 7 day'
  //
  // export const messageSuccessfulSubscription = 'Your subscription activated and valid until'

  return (
    <div className={s.notificationItem}>
      <div className={s.notificationItemTitle}>
        <Typography variant={'bold_text-14'}>Новое уведомление!</Typography>
        {!isRead && (
          <Typography className={clsx(!isRead ? s.newMessage : '')} variant={'small-text'}>
            Новое
          </Typography>
        )}
      </div>
      <div className={s.notificationItemContent}>
        <Typography className={s.notificationText} variant={'regular_text-14'}>
          {message}
        </Typography>
        {/*<Typography className={s.notificationText} variant={'regular_text-14'}>*/}
        {/*  {notificationText.expiredAutoRenewal}*/}
        {/*</Typography>*/}
        {/*<Typography className={s.notificationText} variant={'regular_text-14'}>*/}
        {/*  {notificationText.expiredSevenDays}*/}
        {/*</Typography>*/}
        {/*<Typography className={s.notificationText} variant={'regular_text-14'}>*/}
        {/*  {notificationText.expiredOneDay}*/}
        {/*</Typography>*/}
        <Typography className={s.notificationTime} variant={'small-text'}>
          {useTimeAgo(createdAt)}
        </Typography>
      </div>
    </div>
  )
}
