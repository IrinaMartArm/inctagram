import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { DayPicker, DayPickerProps } from '@/shared/components/dayPicker/DayPicker'

type PropsType<T extends FieldValues> = UseControllerProps<T> &
  Omit<DayPickerProps, 'onChange' | 'selected'>

export const ControlledDayPicker = <T extends FieldValues>({
  control,
  defaultValue,
  errorMessage,
  label,
  shouldUnregister,
  ...rest
}: PropsType<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue,
    name: rest.name,
    shouldUnregister,
  })

  console.log('errorMessage', errorMessage)

  return (
    <DayPicker
      {...rest}
      errorMessage={errorMessage}
      label={label}
      onChange={onChange}
      selected={value}
    />
  )
}
