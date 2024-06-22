import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  LegacyRef,
  ReactNode,
  Ref,
  forwardRef,
} from 'react'

import { clsx } from 'clsx'

import s from './card.module.scss'

type CardProps<T extends ElementType> = {
  as?: T
  children?: ReactNode
  className?: string
  ref?: LegacyRef<HTMLElement>
} & ComponentPropsWithoutRef<T>

export const Card = forwardRef(
  <T extends ElementType = 'div'>(props: CardProps<T>, ref: Ref<ElementRef<T>>) => {
    const { as: Component = 'div', children, className, ...rest } = props

    return (
      <Component className={clsx(s.card, className)} {...rest} ref={ref}>
        {children}
      </Component>
    )
  }
)
