import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

import { Select, SelectType } from '@/shared/components'

interface ControlledSelectProps<T extends FieldValues>
  extends Omit<SelectType, 'onChange' | 'value'> {
  control: Control<T>
  name: Path<T>
}

export function ControlledSelect<T extends FieldValues>({
  control,
  name,
  ...selectProps
}: ControlledSelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Select {...selectProps} onChange={(key, value) => onChange(value)} value={value} />
      )}
    />
  )
}
