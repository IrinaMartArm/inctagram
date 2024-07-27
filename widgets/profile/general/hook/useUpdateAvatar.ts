import { useEffect, useState } from 'react'

import {
  useDeleteUserPhotoMutation,
  useProfileInformationQuery,
  useUploadUserPhotoMutation,
} from '@/shared/assets/api/profile/profile-api'
import { convertFileToBase64, handleErrorResponse } from '@/shared/assets/helpers'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

type ErrorType = FetchBaseQueryError | SerializedError

export const useUpdateAvatar = () => {
  const [setPhoto] = useUploadUserPhotoMutation()
  const [deletePhoto] = useDeleteUserPhotoMutation()
  const { data: profile } = useProfileInformationQuery()
  const [avatar, setAvatar] = useState<string | undefined>(profile?.avatar?.url)

  const updateAvatar = async (newAvatar: File | undefined) => {
    if (newAvatar) {
      convertFileToBase64(newAvatar, (file64: string) => {
        setAvatar(file64)
      })

      try {
        const formData = new FormData()

        formData.append('file', newAvatar)
        await setPhoto({ file: formData }).unwrap()
      } catch (err: unknown) {
        const error = err as ErrorType

        handleErrorResponse(error)
      }
    } else {
      await deletePhotoHandler()
    }
  }

  const deletePhotoHandler = async () => {
    try {
      setAvatar(undefined)
      await deletePhoto().unwrap()
    } catch (err: unknown) {
      const error = err as ErrorType

      handleErrorResponse(error)
    }
  }

  return {
    avatar,
    deletePhotoHandler,
    updateAvatar,
  }
}
