import { ComponentPropsWithoutRef, ElementRef, JSX, forwardRef } from 'react'

import * as Radio from '@radix-ui/react-radio-group'
import cn from 'classnames'

import s from './RadioGroup.module.scss'

import { RadioItem, RadioItemProps } from './radioItem'

export type RadioGroupProps = { options: RadioItemProps[] } & ComponentPropsWithoutRef<
  typeof Radio.Root
>

export const RadioGroup = forwardRef<ElementRef<typeof Radio.Root>, RadioGroupProps>(
  ({ className, options, ...restProps }, ref): JSX.Element => {
    const rootClassName = cn(s.root, className)

    return (
      <Radio.Root className={rootClassName} ref={ref} {...restProps}>
        {options.map(item => (
          <RadioItem key={item.value} {...item} />
        ))}
      </Radio.Root>
    )
  }
)
