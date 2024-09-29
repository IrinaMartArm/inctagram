import { Bell } from '@/public'
import {
  useGetNotificationCountQuery,
  useGetNotificationQuery,
  useUpdateNotificationMutation,
} from '@/shared/assets/api/notifications/notifications-api'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Typography,
} from '@/shared/components'
import { NotificationItem } from '@/widgets/header/ui/notifications/notification-item/notification-item'

import s from './notifications.module.scss'

export const Notifications = () => {
  const { data: notificationData } = useGetNotificationQuery()
  const { data: notificationsCountData } = useGetNotificationCountQuery()
  const [updateNotification] = useUpdateNotificationMutation()

  const isShowMessagesCont = notificationsCountData?.count! > 0

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className={s.wrapper} variant={'icon'}>
          {isShowMessagesCont && (
            <div className={s.notifications}>{notificationsCountData?.count}</div>
          )}
          <Bell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={s.container}>
        <Typography className={s.title} variant={'Bold_text-16'}>
          Уведомления
        </Typography>
        <div>
          {notificationData?.items?.map(notification => (
            <DropdownMenuItem
              className={s.notificationsItem}
              key={notification.id}
              onClick={() => {}}
            >
              <NotificationItem
                createdAt={notification.createdAt}
                id={notification.id}
                isRead={notification.isRead}
                message={notification.message}
                userId={notification.userId}
              />
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
