// import { useEffect } from 'react'
// import { FieldErrors, FieldValues, Path, UseFormSetValue } from 'react-hook-form'
//
// type Args<T extends FieldValues> = {
//   errors: FieldErrors<T>
//   locale?: string
//   setValue: UseFormSetValue<T>
//   values: T
// }
//
// export const useFormRevalidate = <T extends FieldValues>({
//   errors,
//   locale,
//   setValue,
//   values,
// }: Args<T>) => {
//   useEffect(() => {
//     Object.keys(values).forEach(fieldName => {
//       if (fieldName in errors) {
//         const currentValue = values[fieldName as keyof T]
//         const newValue = values[fieldName as keyof T]
//
//         if (currentValue !== newValue) {
//           setValue(fieldName as Path<T>, newValue, { shouldValidate: true })
//         }
//       }
//     })
//   }, [errors, locale, setValue, values])
// }

import { useEffect, useRef } from 'react'
import { FieldErrors, FieldValues, Path, UseFormSetValue } from 'react-hook-form'

interface Args<T extends FieldValues> {
  errors: FieldErrors<T>
  locale?: string
  setValue: UseFormSetValue<T>
  values: T
}

export const useFormRevalidate = <T extends FieldValues>({
  errors,
  locale,
  setValue,
  values,
}: Args<T>) => {
  const prevErrorsRef = useRef(errors)
  const prevLocaleRef = useRef(locale)

  useEffect(() => {
    const hasErrorsChanged = JSON.stringify(errors) !== JSON.stringify(prevErrorsRef.current)
    const hasLocaleChanged = locale !== prevLocaleRef.current

    if (hasErrorsChanged || hasLocaleChanged) {
      prevErrorsRef.current = errors
      prevLocaleRef.current = locale

      Object.keys(values).forEach(fieldName => {
        if (fieldName in errors) {
          setValue(fieldName as Path<T>, values[fieldName as keyof T], {
            shouldValidate: true,
          })
        }
      })
    }
  }, [errors, locale, setValue, values])
}
