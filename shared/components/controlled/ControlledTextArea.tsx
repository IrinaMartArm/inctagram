import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextAreaProps, Textarea } from '@/shared/components/textarea/Textarea'

type PropsType<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'defaultValue' | 'disabled' | 'rules'
> &
  Omit<TextAreaProps, 'onChange' | 'value'>
export const ControlledTextArea = <T extends FieldValues>({
  control,
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

  return (
    <Textarea
      {...rest}
      {...field}
      label={label}
      onChangeValue={e => {
        field.onChange(e) // Вызов метода onChange из useController
        rest.onChangeValue && rest.onChangeValue(e) // Вызов пользовательского обработчика
      }}
    />
  )
}
