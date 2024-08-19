import { baseApi } from '@/shared/assets'
import { DevicesArg } from '@/shared/assets/api/devices/types'

const DevicesApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteAllDevices: builder.mutation<void, void>({
        invalidatesTags: ['Devices'],
        onQueryStarted: async (_arg, { dispatch, getState, queryFulfilled }) => {
          // Declare patchResult outside the try block
          let patchResult: any

          try {
            // Optimistically update the cache
            patchResult = dispatch(
              DevicesApi.util.updateQueryData('getDevices', undefined, draft => {
                // Clear all devices from the draft state
                draft.length = 0
              })
            )

            // Wait for the actual query to complete
            await queryFulfilled
          } catch (error) {
            // If the request fails, undo the optimistic update
            if (patchResult) {
              patchResult.undo()
            }
          }
        },
        query: () => ({
          method: 'DELETE',
          url: 'v1/auth/devices',
        }),
      }),
      deleteDevice: builder.mutation<void, string>({
        invalidatesTags: ['Devices'],
        onQueryStarted: async (deviceId, { dispatch, getState, queryFulfilled }) => {
          // Declare patchResult outside the try block
          let patchResult: any

          try {
            // Optimistically update the cache
            patchResult = dispatch(
              DevicesApi.util.updateQueryData('getDevices', undefined, draft => {
                const index = draft.findIndex(device => device.deviceId === deviceId)

                if (index !== -1) {
                  draft.splice(index, 1)
                }
              })
            )

            // Wait for the actual query to complete
            await queryFulfilled
          } catch (error) {
            // If the request fails, undo the optimistic update
            if (patchResult) {
              patchResult.undo()
            }
          }
        },
        query: deviceId => ({
          method: 'DELETE',
          url: `v1/auth/devices/${deviceId}`,
        }),
      }),
      getDevices: builder.query<DevicesArg[], void>({
        providesTags: ['Devices'],
        query: () => ({
          method: 'GET',
          url: 'v1/auth/devices',
        }),
      }),
    }
  },
})

export const { useDeleteAllDevicesMutation, useDeleteDeviceMutation, useGetDevicesQuery } =
  DevicesApi
