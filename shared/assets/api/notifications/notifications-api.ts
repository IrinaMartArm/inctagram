import { baseApi } from '@/shared/assets'
import {
  NotificationArgs,
  NotificationCount,
  NotificationResponse,
} from '@/shared/assets/api/notifications/types'

const NotificationApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getNotification: builder.query<NotificationResponse, void>({
        providesTags: ['Notifications'],
        query: () => ({
          method: 'GET',
          url: '/v1/notifications',
        }),
      }),
      getNotificationCount: builder.query<NotificationCount, void>({
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
    }
  },
})

export const {
  useGetNotificationCountQuery,
  useGetNotificationQuery,
  useUpdateNotificationMutation,
} = NotificationApi
