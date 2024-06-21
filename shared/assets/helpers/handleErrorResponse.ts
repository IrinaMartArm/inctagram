import { toast } from 'react-toastify'

import { Nullable } from '@/shared/assets/types/types'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

interface FieldError<T extends Record<string, any>> {
  field: keyof T
  message: string
}

interface ResponseError<T extends Record<string, any>> {
  errorDescription?: FieldError<T>[]
  message?: string
  statusCode: number
  timestamp: string
}

interface CatchingData<T extends Record<string, any>> {
  error: Nullable<string>
  fieldErrors: Nullable<FieldError<T>[]>
}

const getValidError = <T extends Record<string, any>>(errorData: ResponseError<T>) => {
  let errorMsg = errorData.message || 'Server error: error message was not received'

  if (errorMsg === 'Http Exception') {
    errorMsg = errorData.errorDescription?.[0].message || 'Http Exception'
  }

  return errorMsg
}

export const handleErrorResponse = <T extends Record<string, any>>(
  error?: FetchBaseQueryError | SerializedError
): CatchingData<T> | undefined => {
  if (!error) {
    return
  }

  switch (true) {
    case 'error' in error: {
      const errorMessage = `${error.status} - ${error.error}`

      toast.error(errorMessage)

      return {
        error: errorMessage,
        fieldErrors: null,
      }
    }
    case 'message' in error: {
      const errorMessage =
        `${error.code} - Serialized error:` + (error.message || 'error message was not received')

      toast.error(errorMessage)

      return {
        error: errorMessage,
        fieldErrors: null,
      }
    }
    case 'data' in error: {
      const errorData = error.data as ResponseError<T>

      const validErrorMessage = getValidError(errorData)

      const errorMessage = `${error.status} - ${validErrorMessage}`

      toast.error(errorMessage)

      return {
        error: errorMessage,
        fieldErrors: errorData.errorDescription || null,
      }
    }
    default: {
      const errorMessage = 'Unknown error: error message and status error was not received'

      toast.error(errorMessage)

      return {
        error: 'Unknown error: error message and status error was not received',
        fieldErrors: null,
      }
    }
  }
}
