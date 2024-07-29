import React, { useState } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextAreaProps, Textarea } from '@/shared/components/textarea/Textarea'

type PropsType<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'defaultValue' | 'disabled' | 'rules'
> &
  Omit<TextAreaProps, 'onChange' | 'value'>

export const ControlledTextArea = <T extends FieldValues>({
  control,
  errorMessage,
  label,
  shouldUnregister,
  ...rest
}: PropsType<T>) => {
  const { field } = useController({
    control,
    disabled: rest.disabled,
    name: rest.name,
    shouldUnregister,
  })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    field.onChange(e) // Call onChange from useController
    rest.onChangeValue && rest.onChangeValue(e) // Call user-provided onChangeValue handler
  }

  return (
    <Textarea
      {...rest}
      {...field}
      errorMessage={errorMessage}
      label={label}
      onChangeValue={handleChange}
    />
  )
}
