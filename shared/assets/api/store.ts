import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { addPhotoReducers, authReducers } from '@/entities'
import { baseApi } from '@/shared/assets/api/base-api'
import { configureStore } from '@reduxjs/toolkit'
import { Context, createWrapper } from 'next-redux-wrapper'

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

// export type AppDispatch = typeof store.dispatch
// export type RootState = ReturnType<typeof store.getState>

export const makeStore = (context?: Context) => {
  return configureStore({
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ thunk: { extraArgument: context } }).concat(baseApi.middleware),
    reducer: {
      addPhoto: addPhotoReducers,
      auth: authReducers,
      [baseApi.reducerPath]: baseApi.reducer,
    },
  })
}

type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const wrapper = createWrapper(makeStore, { debug: false })
