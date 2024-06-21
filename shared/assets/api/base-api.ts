import { baseQueryWithReauth } from '@/shared/assets/api/baseQueryWithReauth/baseQueryWithReauth'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['Me', 'Profile', 'MyPosts'],
})
