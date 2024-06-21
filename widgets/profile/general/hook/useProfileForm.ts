import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useFillOutProfileMutation } from '@/shared/assets/api/profile/profile-api'
import { useTranslationPages } from '@/shared/assets/hooks'
import { AlertVariant } from '@/shared/components/alert/Alert'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

const sixteenYearsAgo = new Date()

sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16)

const profileFormSchema = (t: any) =>
  z.object({
    aboutMe: z.string().max(200, t.errors.aboutMe).optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    dateOfBirth: z
      .string()
      .refine(
        dateString => {
          const dateOfBirth = new Date(dateString)

          return dateOfBirth <= sixteenYearsAgo
        },
        {
          message: t.errors.child,
        }
      )
      .optional(),
    firstName: z.string().min(1, t.errors.firstName).max(50),
    lastName: z.string().min(1, t.errors.lastName).max(50),
    username: z.string().min(6).max(30),
  })

export type ProfileFormSchema = z.infer<ReturnType<typeof profileFormSchema>>

export const useProfileForm = () => {
  const { t } = useTranslationPages()

  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [alertVariant, setAlertVariant] = useState<AlertVariant>('success')

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setError,
  } = useForm<ProfileFormSchema>({
    mode: 'onBlur',
    resolver: zodResolver(profileFormSchema(t)),
  })

  const [fillOutProfile, {}] = useFillOutProfileMutation()

  const alertHandler = () => {
    setShowAlert(!showAlert)
  }

  const onSubmit = async (data: ProfileFormSchema) => {
    try {
      await fillOutProfile(data).unwrap()
      setAlertMessage(t.success)
      setAlertVariant('success')
      alertHandler()
    } catch (error: any) {
      // Handling server errors
      if (error.data?.errorsMessages) {
        error.data.errorsMessages.forEach((err: { field: string; message: string }) => {
          setError(err.field as keyof ProfileFormSchema, { message: err.message, type: 'server' })
        })
      } else {
        setAlertMessage(t.errors.fell)
        setAlertVariant('error')
        alertHandler()
      }
    }
  }

  return {
    alertHandler,
    alertMessage,
    alertVariant,
    control,
    errors,
    handleSubmit,
    isValid,
    onSubmit,
    reset,
    showAlert,
    t,
  }
}
