import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { addPhotoReducers, authReducers } from '@/entities'
import { baseApi } from '@/shared/assets/api/base-api'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(baseApi.middleware)
  },
  reducer: {
    addPhoto: addPhotoReducers,
    auth: authReducers,
    [baseApi.reducerPath]: baseApi.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

setupListeners(store.dispatch)
