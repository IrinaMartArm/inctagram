import { ComponentPropsWithoutRef, ElementRef, JSX, forwardRef } from 'react'

import { Typography } from '@/shared/components'
import * as Radio from '@radix-ui/react-radio-group'
import cn from 'classnames'

import s from './RadioItem.module.scss'

export type RadioItemProps = {
  title: string
} & ComponentPropsWithoutRef<typeof Radio.Item>

export const RadioItem = forwardRef<ElementRef<typeof Radio.Item>, RadioItemProps>(
  ({ disabled, title, value }, ref): JSX.Element => {
    const classNames = {
      indicator: s.indicator,
      item: s.item,
      label: cn(s.label, disabled && s.disabled),
      title: cn(s.title, disabled && s.disabledTitle),
    }

    return (
      <Typography as={'label'} className={classNames.label} variant={'regular_text-14'}>
        <Radio.Item className={classNames.item} disabled={disabled} ref={ref} value={value}>
          <Radio.Indicator className={classNames.indicator} />
        </Radio.Item>
        <Typography as={'span'} className={classNames.title} variant={'regular_text-14'}>
          {title}
        </Typography>
      </Typography>
    )
  }
)
