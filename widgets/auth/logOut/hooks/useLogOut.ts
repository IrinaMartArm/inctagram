import { useAppDispatch } from '@/bll/store'
import { authActions } from '@/entities'
import { Paths } from '@/shared/assets'
import { useLogoutMutation } from '@/shared/assets/api/auth/auth-api'
import PostApi from '@/shared/assets/api/post/post-api'
import { handleErrorResponse } from '@/shared/assets/helpers'
import { useTranslation } from '@/shared/assets/hooks'
import { useRouter } from 'next/router'

export const useLogOut = () => {
  const { t } = useTranslation()
  const [logOut] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const logOutCallback = () => {
    logOut().then(res => {
      if ('error' in res) {
        return handleErrorResponse(res.error)
      } else {
        localStorage.removeItem('sign-in')
        void router.push(Paths.LOGIN)
        dispatch(authActions.setEmail(null))
        dispatch(authActions.setIsAuth(false))
        dispatch(PostApi.util.resetApiState())
      }
    })
  }

  return {
    logOutCallback,
    t,
  }
}
