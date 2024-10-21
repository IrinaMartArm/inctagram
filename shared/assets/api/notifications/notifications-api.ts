import { baseApi } from '@/shared/assets'
import {
  NotificationArgs,
  NotificationCount,
  NotificationResponse,
} from '@/shared/assets/api/notifications/types'
import { Socket, io } from 'socket.io-client'

const SOCKET_URL = 'https://inctagram.org'

export const NotificationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotification: builder.query<NotificationResponse, void>({
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, dispatch, updateCachedData }
      ) {
        const socket: Socket = io(SOCKET_URL, {
          auth: {
            accessToken: localStorage.getItem('accessToken'),
          },
        })

        try {
          await cacheDataLoaded

          socket.on('newNotification', (newNotification: NotificationResponse) => {
            updateCachedData(draft => {
              if (Array.isArray(draft)) {
                draft.unshift(newNotification)
              } else {
                // Handle the case where draft is not an array
                console.error('Expected draft to be an array')
              }
            })
            dispatch(NotificationApi.util.invalidateTags(['Notifications']))
          })
        } catch (error) {
          console.error('Error in notification socket listener:', error)
          // Handle errors if necessary
        }

        await cacheEntryRemoved
        socket.off('newNotification')
        socket.disconnect()
      },
      providesTags: ['Notifications'],
      query: () => ({
        method: 'GET',
        url: '/v1/notifications',
      }),
    }),
    getNotificationCount: builder.query<NotificationCount, void>({
      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        const socket: Socket = io(SOCKET_URL, {
          auth: {
            accessToken: localStorage.getItem('accessToken'),
          },
        })

        try {
          await cacheDataLoaded

          socket.on('notificationCountUpdate', (newCount: NotificationCount) => {
            updateCachedData(() => newCount)
          })
        } catch (error) {
          console.error('Error in notificationCountUpdate socket listener:', error)
          // Handle errors if necessary
        }

        await cacheEntryRemoved
        socket.off('notificationCountUpdate')
        socket.disconnect()
      },
      providesTags: ['Notifications'],
      query: () => ({
        method: 'GET',
        url: '/v1/notifications/unread-count',
      }),
    }),
    updateNotification: builder.mutation<void, NotificationArgs>({
      invalidatesTags: ['Notifications'],
      query: ids => ({
        body: ids,
        method: 'PUT',
        url: '/v1/notifications/mark-as-read',
      }),
    }),
  }),
})

export const {
  useGetNotificationCountQuery,
  useGetNotificationQuery,
  useUpdateNotificationMutation,
} = NotificationApi
