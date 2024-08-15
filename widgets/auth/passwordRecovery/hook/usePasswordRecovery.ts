import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  usePasswordRecoveryMutation,
  usePasswordResendingMutation,
} from '@/shared/assets/api/auth/auth-api'
import { handleErrorResponse } from '@/shared/assets/helpers/handleErrorResponse'
import { useFormRevalidate, useTranslationPages } from '@/shared/assets/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { z } from 'zod'

export const usePasswordRecovery = () => {
  const { locale, t } = useTranslationPages()

  const passwordRecoverySchema = z.object({
    email: z.string().trim().email(t.formEmail),
    token: z.string(),
  })

  type PasswordRecoveryFormFields = z.infer<typeof passwordRecoverySchema>

  const defaultValues = {
    email: '',
    token: '',
  }

  const [token, setToken] = useState<null | string>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [passwordResending] = usePasswordResendingMutation()
  const [passwordRecovery, {}] = usePasswordRecoveryMutation()
  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    setError,
    setValue,
  } = useForm<PasswordRecoveryFormFields>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(passwordRecoverySchema),
  })

  const isChecked = !!token
  const onRecovery = async (data: PasswordRecoveryFormFields) => {
    localStorage.setItem('email', data.email)
    if (token) {
      const body = { email: data.email, reCaptcha: token }

      try {
        await passwordRecovery(body).unwrap()
        setIsSuccess(true)
      } catch (err: unknown) {
        setIsSuccess(false)
        if (err as FetchBaseQueryError) {
          const { status } = err as FetchBaseQueryError

          if (status === 404) {
            setError('email', {
              message: t.emailError,
              type: 'manual',
            })
          }
          handleErrorResponse(err as FetchBaseQueryError)
        }
      }
    }
  }
  const handleRecaptchaChange = (token: null | string) => {
    setToken(token)
    if (token) {
      setValue('token', token)
    }
  }

  useFormRevalidate({
    errors,
    locale,
    setValue,
    values: getValues(),
  })
  const email = localStorage.getItem('email')
  const onResendClick = async () => {
    await passwordResending({ email: email || '' }).unwrap()
  }

  return {
    control,
    errors,
    handleRecaptchaChange,
    handleSubmit,
    isChecked,
    isSuccess,
    isValid,
    onRecovery,
    onResendClick,
    t,
  }
}
