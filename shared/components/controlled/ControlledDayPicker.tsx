import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { DayPicker, DayPickerProps } from '@/shared/components/dayPicker/DayPicker'

type PropsType<T extends FieldValues> = UseControllerProps<T> &
  Omit<DayPickerProps, 'onChange' | 'selected' | 'setDateFormatError'>

export const ControlledDayPicker = <T extends FieldValues>({
  control,
  defaultValue,
  errorMessage,
  label,
  setDateFormatError,
  shouldUnregister,
  ...rest
}: PropsType<T> & { setDateFormatError: (hasError: boolean) => void }) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue,
    name: rest.name,
    shouldUnregister,
  })

  return (
    <DayPicker
      {...rest}
      errorMessage={errorMessage}
      label={label}
      onChange={onChange}
      selected={value}
      setDateFormatError={setDateFormatError}
    />
  )
}
