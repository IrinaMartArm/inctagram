import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useFillOutProfileMutation } from '@/shared/assets/api/profile/profile-api'
import { UserProfileResponse } from '@/shared/assets/api/profile/types'
import { useTranslationPages } from '@/shared/assets/hooks'
import { AlertVariant } from '@/shared/components/alert/Alert'
import { ProfileFormSchema, belarus, countries, profileFormSchema, russia } from '@/widgets'
import { zodResolver } from '@hookform/resolvers/zod'

export const useProfileForm = (profile: UserProfileResponse) => {
  const { t } = useTranslationPages()

  const [isShowModal, setIsShowModal] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(countries[0].value)
  const [selectedCity, setSelectedCity] = useState(belarus[0].value)
  const [cities, setCities] = useState(russia)

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
    handleSubmit,
    reset,
    setError,
  } = useForm<ProfileFormSchema>({
    defaultValues: defaultValues,
    mode: 'onChange',
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
      if (error.data?.errorsMessages) {
        error.data.errorsMessages.forEach((err: { field: string; message: string }) => {
          setError(err.field as keyof ProfileFormSchema, {
            message: err.message,
            type: 'server',
          })
        })
      } else {
        setAlertMessage(t.errors.fell)
        setAlertVariant('error')
        alertHandler()
      }
    }
  }

  const handleCountryChange = (key: string, value: string) => {
    setSelectedCountry(value)
  }

  const handleCityChange = (key: string, value: string) => {
    setSelectedCity(value)
  }

  return {
    alertHandler,
    alertMessage,
    alertVariant,
    cities,
    control,
    errors,
    handleCityChange,
    handleCountryChange,
    handleSubmit,
    isShowModal,
    isValid,
    onSubmit,
    reset,
    selectedCity,
    selectedCountry,
    setCities,
    setIsShowModal,
    setSelectedCity,
    showAlert,
    t,
  }
}
