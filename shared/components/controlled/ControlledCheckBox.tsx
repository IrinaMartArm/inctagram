import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { CheckBox, CheckboxProps } from '@/shared/components'

type PropsType<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'defaultValue' | 'disabled' | 'rules'
> &
  Omit<CheckboxProps, 'checked' | 'onCheckedChange'> & { recaptcha?: boolean }
export const ControlledCheckBox = <T extends FieldValues>({
  control,
  label,
  recaptcha,
  shouldUnregister,
  ...rest
}: PropsType<T>) => {
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error },
  } = useController({
    control,
    disabled: rest.disabled,
    name: rest.name,
    shouldUnregister,
  })

  return (
    <CheckBox
      {...rest}
      checked={value}
      errorMessage={error?.message}
      label={label}
      onBlur={onBlur}
      onCheckedChange={onChange}
      recaptcha={recaptcha}
      ref={ref}
    />
  )
}
