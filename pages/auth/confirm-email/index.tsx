import { useCallback, useLayoutEffect } from 'react'

import { ParsedUrlQuery } from 'querystring'

import { useRegistrationConfirmationMutation } from '@/shared/assets/api/auth/auth-api'
import { handleErrorResponse } from '@/shared/assets/helpers/handleErrorResponse'
import { Loader } from '@/shared/components'
import { getLayout } from '@/shared/components/layout/baseLayout/BaseLayout'
import { EmailConfirmedCard, Verification } from '@/widgets'
import { useRouter } from 'next/router'

const Confirmed = () => {
  const router = useRouter()
  const [registrationConfirmation, { error, isLoading }] = useRegistrationConfirmationMutation()

  const confirmation = useCallback(async () => {
    const query: ParsedUrlQuery = router.query
    const code = query.code as string
    const email = query.email as string

    try {
      if (code && email) {
        await registrationConfirmation({ code: code })
        localStorage.setItem('email', email)
      }
    } catch (error: any) {
      handleErrorResponse(error)
    }
  }, [registrationConfirmation, router])

  useLayoutEffect(() => {
    confirmation()
  }, [confirmation])

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <Verification />
  }

  return <EmailConfirmedCard />
}

Confirmed.getLayout = getLayout
export default Confirmed
