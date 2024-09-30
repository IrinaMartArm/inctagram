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

const SOCKET_URL = 'https://inctagram.org' // Update this if the socket server is on a different subdomain

export const Notifications = () => {
  const { data: notificationData, refetch: refetchNotifications } = useGetNotificationQuery()
  const { data: notificationsCountData, refetch: refetchCount } = useGetNotificationCountQuery()
  const [updateNotification] = useUpdateNotificationMutation()

  const isShowMessagesCont = (notificationsCountData?.count ?? 0) > 0

  const socketRef = useRef<Socket | null>(null)

  const handleNewNotification = useCallback(() => {
    refetchNotifications()
    refetchCount()
  }, [refetchNotifications, refetchCount])

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      withCredentials: true,
    })

    socketRef.current.on('connect', () => {
      console.log('Connected to socket server')
    })

    socketRef.current.on('connect_error', error => {
      console.error('Socket connection error:', error)
    })

    socketRef.current.on('newNotification', handleNewNotification)

    return () => {
      socketRef.current?.off('newNotification', handleNewNotification)
      socketRef.current?.disconnect()
    }
  }, [handleNewNotification])

  const handleNotificationClick = useCallback(
    (notificationId: string) => {
      // Mark notification as read
      updateNotification({ ids: [notificationId] })

      // Refetch notifications and count to reflect the changes
      refetchNotifications()
      refetchCount()

      // You might want to navigate to a specific page or perform some action here
    },
    [updateNotification, refetchNotifications, refetchCount]
  )

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
