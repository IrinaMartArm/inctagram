import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useFillOutProfileMutation } from '@/shared/assets/api/profile/profile-api'
import { UserProfileResponse } from '@/shared/assets/api/profile/types'
import { useFormRevalidate, useTranslation } from '@/shared/assets/hooks'
import { AlertVariant } from '@/shared/components/alert/Alert'
import { NOT_SELECTED, ProfileFormSchema, belarus, profileFormSchema, russia } from '@/widgets'
import { zodResolver } from '@hookform/resolvers/zod'

export const useProfileForm = (profile: UserProfileResponse) => {
  const { locale, t } = useTranslation()
  const [isShowModal, setIsShowModal] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [alertVariant, setAlertVariant] = useState<AlertVariant>('success')

  const defaultValues = {
    aboutMe: profile.aboutMe || undefined,
    city: profile.city || undefined,
    country: profile.country || undefined,
    dateOfBirth: profile.dateOfBirth || undefined,
    firstName: profile.firstName,
    lastName: profile.lastName,
    username: profile.username,
  }

  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
  } = useForm<ProfileFormSchema>({
    defaultValues: defaultValues,
    mode: 'onChange',
    resolver: zodResolver(profileFormSchema(t)),
  })

  const [fillOutProfile, { isLoading: loading }] = useFillOutProfileMutation()

  const watchCountry = watch('country')

  useEffect(() => {
    if (watchCountry === NOT_SELECTED) {
      setValue('city', NOT_SELECTED)
    }
  }, [watchCountry, setValue])

  const alertHandler = () => {
    setShowAlert(!showAlert)
  }

  const onSubmit = async (data: ProfileFormSchema) => {
    const transformedData = Object.entries(data).reduce<ProfileFormSchema>((acc, [key, value]) => {
      acc[key as keyof ProfileFormSchema] = value === NOT_SELECTED ? (undefined as any) : value

      return acc
    }, {} as ProfileFormSchema)

    try {
      await fillOutProfile(transformedData).unwrap()
      setAlertMessage(t.profileSettings.errors.success)
      setAlertVariant('success')
      alertHandler()
    } catch (error: any) {
      if (error.data?.errorsMessages) {
        error.data.errorsMessages.forEach((err: { field: string; message: string }) => {
          setError(err.field as keyof ProfileFormSchema, {
            message: err.message,
            type: 'server',
          })
        })
      } else {
        setAlertMessage(t.profileSettings.errors.fell)
        setAlertVariant('error')
        alertHandler()
      }
    }
  }

  const getCities = () => {
    if (watchCountry === 'russia') {
      return russia
    }
    if (watchCountry === 'belarus') {
      return belarus
    }

    return [{ title: 'Not selected', value: NOT_SELECTED }]
  }

  useFormRevalidate({
    errors,
    locale,
    setValue,
    values: getValues(),
  })

  return {
    alertHandler,
    alertMessage,
    alertVariant,
    control,
    errors,
    getCities,
    handleSubmit,
    isShowModal,
    isValid,
    loading,
    onSubmit,
    reset,
    setIsShowModal,
    showAlert,
    t,
    watchCountry,
  }
}
