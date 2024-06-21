import { Typography } from '@/shared/components'
import { clsx } from 'clsx'

import s from './pageTitle.module.scss'

type TextAlign = 'center' | 'left'

type Props = {
  className?: string
  textAlign?: TextAlign
  title: string
}

export const PageTitle = ({ className, textAlign = 'left', title }: Props) => {
  const titleCN = clsx(s.title, textAlign === 'center' && s.center, className)

  return (
    <Typography as={'h1'} className={titleCN} variant={'h1'}>
      {title}
    </Typography>
  )
}
