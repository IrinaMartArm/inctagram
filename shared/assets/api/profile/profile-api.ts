import { baseApi } from '@/shared/assets/api'
import {
  UserPhotoArgs,
  UserProfileArgs,
  UserProfileResponse,
} from '@/shared/assets/api/profile/types'

export const profileApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteUserPhoto: builder.mutation<void, void>({
        invalidatesTags: ['Profile'],
        query: () => ({
          method: 'DELETE',
          url: 'v1/user/delete-user-photo',
        }),
      }),
      fillOutProfile: builder.mutation<void, UserProfileArgs>({
        invalidatesTags: ['Profile'],

        onQueryStarted: async ({ ...arg }, { dispatch, queryFulfilled }) => {
          const patchResult = dispatch(
            profileApi.util.updateQueryData('profileInformation', undefined, draft => {
              Object.assign(draft, arg)
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult?.undo()
          }
        },

        query: body => ({
          body,
          method: 'PUT',
          providesTags: 'Profile',
          url: 'v1/user/fill-out-profile',
        }),
      }),
      profileInformation: builder.query<UserProfileResponse, void>({
        providesTags: ['Profile'],
        query: arg => ({
          url: 'v1/user/profile-information',
        }),
      }),
      uploadUserPhoto: builder.mutation<void, UserPhotoArgs>({
        invalidatesTags: ['Profile'],

        query: body => ({
          body: body.file,
          method: 'POST',
          url: 'v1/user/upload-user-photo',
        }),
      }),
    }
  },
})

export const { profileInformation } = profileApi.endpoints
export const {
  useDeleteUserPhotoMutation,
  useFillOutProfileMutation,
  useProfileInformationQuery,
  useUploadUserPhotoMutation,
} = profileApi
