import { useRef, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/bll/store'
import { authActions } from '@/entities'
import { userEmailSelector } from '@/entities/auth/model/auth-slice'
import { useTranslationPages } from '@/shared/assets'
import { useSignUpMutation } from '@/shared/assets/api/auth/auth-api'
import { setToLocalStorage } from '@/shared/assets/helpers/setToLocalStorage'
import { UseFormRef } from '@/shared/assets/types/form'
import { HeadMeta } from '@/shared/components/headMeta/HeadMeta'
import { getLayout } from '@/shared/components/layout/baseLayout/BaseLayout'
import { Modal } from '@/shared/components/modals'
import { EmailSent } from '@/widgets'
import { SignUpCard } from '@/widgets/auth/signUp/ui/SignUp'
import { SignUpFormFields } from '@/widgets/auth/signUp/validators/validators'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

type FieldsError = {
  [key: string]: { field: string; message: string }[]
}

const SignUp = () => {
  const dispatch = useAppDispatch()
  const ref = useRef<UseFormRef<SignUpFormFields>>(null)
  const [open, setOpen] = useState(false)
  const { t } = useTranslationPages()
  const email = useAppSelector(userEmailSelector)

  const [signUp, { isLoading }] = useSignUpMutation()

  const handleSubmit = async ({ agree, confirm, ...data }: SignUpFormFields) => {
    dispatch(authActions.setEmail(data.email))
    setToLocalStorage('username', data.username)
    try {
      await signUp(data).unwrap()

      setOpen(true)
    } catch (e: any) {
      // const setError = ref.current?.setError
      //
      // if (e.data?.errorsMessages) {
      //   e.data.errorsMessages.forEach((err: { field: string; message: string }) => {
      //     if (setError) {
      //       setError(err.field as keyof SignUpFormFields, {
      //         message: err.message,
      //         type: 'server',
      //       })
      //     }
      //   })
      // }

      if (e as FetchBaseQueryError) {
        const { errorsMessages } = (e as FetchBaseQueryError).data as FieldsError
        const setError = ref.current?.setError

        if (errorsMessages[0].field) {
          const err = errorsMessages[0].field

          if (err === 'username') {
            setError && setError(err, { message: t.usernameExistsError })
          }

          if (err === 'email') {
            setError && setError(err, { message: t.emailExistsError })
          }
        }
      }
    }
  }

  const onOpenChangeHandler = (open: boolean) => {
    setOpen(open)
    ref.current?.reset()
  }

  return (
    <>
      <HeadMeta title={'Sign Up'} />

      <Modal onOpenChange={onOpenChangeHandler} open={open} title={t.emailSent}>
        <EmailSent email={email || ''} />
      </Modal>
      <SignUpCard isLoading={isLoading} onSubmit={handleSubmit} ref={ref} />
    </>
  )
}

SignUp.getLayout = getLayout
export default SignUp
