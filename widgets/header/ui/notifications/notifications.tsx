import { useCallback, useEffect, useRef } from 'react'

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
import { Socket, io } from 'socket.io-client'

import s from './notifications.module.scss'

export const Notifications = () => {
  const { data: notificationData, refetch: refetchNotifications } = useGetNotificationQuery()
  const { data: notificationsCountData, refetch: refetchCount } = useGetNotificationCountQuery()
  const [updateNotification] = useUpdateNotificationMutation()

  const isShowMessagesCont = notificationsCountData?.count! > 0

  const socketRef = useRef<Socket | null>(null)

  const handleNewNotification = useCallback(
    (data: any) => {
      console.log('New notification received:', data)
      if (data.items && data.items.length > 0) {
        refetchNotifications()
        refetchCount()
      }
    },
    [refetchNotifications, refetchCount]
  )

  useEffect(() => {
    // Establish socket connection
    socketRef.current = io('https://inctagram.org/', {
      withCredentials: true,
    })

    // Set up event listener
    socketRef.current.on('newNotification', handleNewNotification)

    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.off('newNotification', handleNewNotification)
        socketRef.current.disconnect()
      }
    }
  }, [handleNewNotification])

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
