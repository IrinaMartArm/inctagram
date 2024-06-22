import { useEffect } from 'react'

import { authActions } from '@/entities'
import { Paths } from '@/shared/assets'
import { useLazyMeQuery } from '@/shared/assets/api/auth/auth-api'
import { useAppDispatch } from '@/shared/assets/api/store'
import { setAccessToken } from '@/shared/assets/helpers/authentication'
import { HeadMeta, Loader } from '@/shared/components'
import { useRouter } from 'next/router'

const GoogleAuth = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [getUser, {}] = useLazyMeQuery()

  useEffect(() => {
    const handleGoogleAuth = async () => {
      try {
        const queryString = window.location.search

        setAccessToken(queryString)

        const res = await getUser().unwrap()

        localStorage.setItem('email', res.email)

        await router.push(`${Paths.PROFILE}/?id=${res?.userId!}`)
        dispatch(authActions.setIsAuth(true))
      } catch (error) {
        console.error('Error during Google authentication:', error)
        void router.push(Paths.LOGIN)
      }
    }

    void handleGoogleAuth()
  }, [dispatch, getUser, router])

  return (
    <>
      <HeadMeta title={'Google auth'} />
      <Loader />
    </>
  )
}

export default GoogleAuth
