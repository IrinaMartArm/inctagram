import { baseApi } from '@/shared/assets'
import {
  CreateSubscriptionArgs,
  CreateSubscriptionResp,
  CurrentSubscriptionResponse,
  MyPaymentsArgs,
  MyPaymentsResponse,
} from '@/shared/assets/api/subscriptions/types'

export const SubscriptionsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createSubscription: builder.mutation<CreateSubscriptionResp, CreateSubscriptionArgs>({
        invalidatesTags: ['Subscriptions'],
        query: body => ({
          body,
          method: 'POST',
          url: 'v1/subscriptions/create-payment',
        }),
      }),
      getCurrentSubscription: builder.query<CurrentSubscriptionResponse, void>({
        providesTags: ['Subscriptions'],
        query: () => ({
          method: 'GET',
          url: `v1/subscriptions/current-subscription`,
        }),
      }),
      getPayments: builder.query<MyPaymentsArgs, MyPaymentsResponse>({
        query: ({ page, pageSize }) => ({
          method: 'GET',
          url: `v1/subscriptions/my-payments?page=${page}&pageSize=${pageSize}`,
        }),
      }),
    }
  },
})

export const {
  useCreateSubscriptionMutation,
  useGetCurrentSubscriptionQuery,
  useGetPaymentsQuery,
} = SubscriptionsApi
