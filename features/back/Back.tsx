import { ArrowLeft } from '@/public'
import { Button, Typography } from '@/shared/components'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import s from './back.module.scss'

type Props = {
  className?: string
  text: string
}
export const Back = ({ className, text }: Props) => {
  const router = useRouter()
  const handleGoBack = () => {
    router.back()
  }

  const linkCN = clsx(s.link, className)

  return (
    <Button aria-label={text} className={linkCN} onClick={handleGoBack} variant={'icon'}>
      <ArrowLeft />

      <Typography className={s.text} variant={'regular_text-14'}>
        {text}
      </Typography>
    </Button>
  )
}
