import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  extraReducers: builder => {
    builder.addMatcher(
      action => {
        return !!(
          action.type.endsWith('/fulfilled') || action.type.endsWith('/removeMutationResult')
        )
      },
      state => {
        state.error = undefined
      }
    )
  },
  initialState: {
    email: undefined as string | undefined,
    error: undefined as string | undefined,
    isAuth: true,
  },
  name: 'auth',
  reducers: {
    setEmail: (state, action: PayloadAction<string | undefined>) => {
      state.email = action.payload
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
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
