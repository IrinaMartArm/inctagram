import { Typography } from '@/shared/components'

import s from './info.module.scss'

type InfoProps = {
  number: number
  title: string
}

export const Info = ({ number, title }: InfoProps) => {
  return (
    <div className={s.root}>
      <Typography variant={'regular_text-14'}>{number}</Typography>
      <Typography variant={'regular_text-14'}>{title}</Typography>
    </div>
  )
}
