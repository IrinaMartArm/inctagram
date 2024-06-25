import { ChangeEvent, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './textarea.module.scss'

import { Typography } from '../typography'

export type TextAreaProps = {
  className?: string
  error?: string
  errorMessage?: string
  id?: string
  isDisabled?: boolean
  label?: string
  onChangeValue?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  value: string
} & ComponentPropsWithoutRef<'textarea'>

export const Textarea = forwardRef<ElementRef<'textarea'>, TextAreaProps>((props, ref) => {
  const { className, errorMessage, isDisabled, label, onChangeValue, placeholder, value } = props

  const textAreaClassName = clsx(s.textarea, className && className, errorMessage && s.error)

  return (
    <div className={s.root}>
      <Typography className={s.text} variant={'regular_text-14'}>
        {label}
      </Typography>

      <textarea
        className={textAreaClassName}
        disabled={isDisabled}
        onChange={onChangeValue}
        placeholder={placeholder}
        ref={ref}
        value={value}
      />
      {errorMessage && (
        <Typography className={s.error__message} variant={'small-text'}>
          {errorMessage}
        </Typography>
      )}
      {/*<div className={s.error__message}>{error && error}</div>*/}
    </div>
  )
})
