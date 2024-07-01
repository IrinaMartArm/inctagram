import { PropsWithChildren } from 'react'

import { HeadMeta } from '@/shared/components'

import s from './pageWrapper.module.scss'

type PropsType = {
  title?: string
}

export const PageWrapper = (props: PropsWithChildren<PropsType>) => {
  const { children, title } = props

  return (
    <>
      <HeadMeta title={title} />
      <div className={s.root}>{children}</div>
    </>
  )
}
