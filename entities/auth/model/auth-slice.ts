import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialStateType = {
  email: null | string
  error: null | string
  isAuth: boolean
}

const initialState: InitialStateType = {
  email: null,
  error: null,
  isAuth: false,
}

const slice = createSlice({
  extraReducers: builder => {
    builder.addMatcher(
      action => {
        return !!(
          action.type.endsWith('/fulfilled') || action.type.endsWith('/removeMutationResult')
        )
      },
      state => {
        state.error = null
      }
    )
  },
  initialState,
  name: 'auth',
  reducers: {
    setEmail: (state, action: PayloadAction<null | string>) => {
      state.email = action.payload
    },
    setError: (state, action: PayloadAction<null | string>) => {
      state.error = action.payload
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
  },
  selectors: {
    errorSelector: state => state.error,
    isAuthSelector: state => state.isAuth,
    userEmailSelector: state => state.email,
  },
})

export const authReducers = slice.reducer
export const authActions = slice.actions
export const { errorSelector, isAuthSelector, userEmailSelector } = slice.selectors
