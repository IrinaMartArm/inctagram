import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Check, CheckMark } from '@/public'
import { Typography } from '@/shared/components'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import { clsx } from 'clsx'
import { AnimatePresence } from 'framer-motion'

import s from './checkBox.module.scss'

export type CheckboxProps = {
  className?: string
  errorMessage?: string
  label?: string
  recaptcha?: boolean
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const CheckBox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>(
  (
    { checked, className, disabled, errorMessage, label, onCheckedChange, recaptcha, ...rest },
    ref
  ) => {
    const classNames = {
      arrowColor: clsx(disabled ? 'var(--color-light-700)' : ''),
      buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled, recaptcha && s.recaptcha),
      checkColor: clsx(disabled ? 'var(--color-dark-100)' : 'var(--color-light-100)'),
      checkColorB: clsx(disabled ? 'var(--color-light-900)' : 'var(--color-dark-900)'),
      container: clsx(s.container, className),
      errorMessage: clsx(s.errorMessage, recaptcha && s.recaptcha),
      label: clsx(s.label, disabled && s.disabled),
      root: clsx(s.root, recaptcha && s.recaptcha),
    }

    return (
      <div className={classNames.container}>
        <LabelRadix.Root asChild className={classNames.label}>
          <Typography variant={'regular_text-14'}>
            <div className={classNames.buttonWrapper}>
              <CheckboxRadix.Root
                checked={checked}
                className={classNames.root}
                disabled={disabled}
                onCheckedChange={onCheckedChange}
                ref={ref}
                {...rest}
              >
                <AnimatePresence initial={false}>
                  {checked && (
                    <CheckboxRadix.Indicator asChild className={s.indicator} forceMount>
                      {recaptcha ? (
                        <CheckMark />
                      ) : (
                        <Check color={classNames.checkColor} colorB={classNames.checkColorB} />
                      )}
                    </CheckboxRadix.Indicator>
                  )}
                </AnimatePresence>
              </CheckboxRadix.Root>
            </div>
            {label}
          </Typography>
        </LabelRadix.Root>
        <Typography className={classNames.errorMessage} variant={'small-text'}>
          {errorMessage}
        </Typography>
      </div>
    )
  }
)

CheckBox.displayName = 'CheckBox'
