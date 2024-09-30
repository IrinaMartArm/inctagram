import { useCallback, useEffect, useRef, useState } from 'react'

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

interface NotificationData {
  items: Array<{
    createdAt: string
    id: string
    isRead: boolean
    message: string
    userId: string
  }>
}

const SOCKET_URL = 'https://inctagram.org'

export const Notifications = () => {
  const { data: notificationData, refetch: refetchNotifications } = useGetNotificationQuery()
  const { data: notificationsCountData, refetch: refetchCount } = useGetNotificationCountQuery()
  const [updateNotification] = useUpdateNotificationMutation()

  const [localNotifications, setLocalNotifications] = useState<NotificationData | null>(null)

  const isShowMessagesCont = (notificationsCountData?.count ?? 0) > 0

  const socketRef = useRef<Socket | null>(null)

  const handleNewNotification = useCallback(
    (data: NotificationData) => {
      if (data.items && data.items.length > 0) {
        setLocalNotifications(prevNotifications => ({
          items: [...(prevNotifications?.items || []), ...data.items],
        }))
        refetchCount()
      }
    },
    [refetchCount]
  )

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

  useEffect(() => {
    if (notificationData) {
      setLocalNotifications(notificationData)
    }
  }, [notificationData])

  const handleNotificationClick = useCallback(
    (notificationId: string) => {
      // Mark notification as read
      updateNotification({ ids: [notificationId] })

      // Update local state to mark the notification as read
      setLocalNotifications(prevNotifications => {
        if (!prevNotifications) {
          return null
        }

        return {
          items: prevNotifications.items.map(item =>
            item.id === notificationId ? { ...item, isRead: true } : item
          ),
        }
      })

      // Decrease the notification count
      refetchCount()

      // You might want to navigate to a specific page or perform some action here
    },
    [updateNotification, refetchCount]
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
          {localNotifications?.items?.map(notification => (
            <DropdownMenuItem
              className={s.notificationsItem}
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id)}
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
