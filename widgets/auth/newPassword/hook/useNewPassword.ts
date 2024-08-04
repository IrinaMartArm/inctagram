import { useForm } from 'react-hook-form'

import { ParsedUrlQuery } from 'querystring'

import { Paths } from '@/shared/assets'
import { useCreateNewPasswordMutation } from '@/shared/assets/api/auth/auth-api'
import { handleErrorResponse } from '@/shared/assets/helpers/handleErrorResponse'
import { useFormRevalidate, useTranslationPages } from '@/shared/assets/hooks'
import { NewPasswordFormFields, newPasswordSchema } from '@/widgets/auth/newPassword/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useRouter } from 'next/router'

export const useNewPassword = () => {
  const router = useRouter()
  const { locale, t } = useTranslationPages()

  const defaultValues = {
    newPassword: '',
    passwordConfirmation: '',
  }

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
    setValue,
  } = useForm<NewPasswordFormFields>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(newPasswordSchema(t)),
  })

  const [createNewPassword, { isLoading }] = useCreateNewPasswordMutation()

  const query: ParsedUrlQuery = router.query
  const code = query.recoveryCode as string
  const email = query.mail as string

  const newPasswordCreator = async (data: NewPasswordFormFields) => {
    const args = {
      newPassword: data.newPassword,
      recoveryCode: code || '',
    }

    try {
      await createNewPassword(args).unwrap()
      await router.replace(Paths.LOGIN)
      localStorage.setItem('email', email)
    } catch (err: any) {
      const { status } = err as FetchBaseQueryError

      if (status === 400) {
        await router.replace({
          pathname: Paths.VERIFICATION,
          query: { param: 'password' },
        })
      }
      // handleErrorResponse(err)
    }
    reset(defaultValues)
  }

  useFormRevalidate({
    errors,
    locale,
    setValue,
    values: getValues(),
  })

  return { control, errors, handleSubmit, isLoading, newPasswordCreator, t }
}
