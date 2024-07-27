import { PropsWithChildren } from 'react'

import { isAuthSelector } from '@/entities'
import { useMeQuery } from '@/shared/assets/api/auth/auth-api'
import { useAppSelector } from '@/shared/assets/api/store'
import { Header } from '@/widgets'
import { NextPage } from 'next'

import 'react-toastify/dist/ReactToastify.css'

import s from './layout.module.scss'

export const Layout: NextPage<PropsWithChildren> = props => {
  const { children } = props
  const { data: me } = useMeQuery()
  const isAuth = me?.userId !== undefined

  return (
    <div className={s.root}>
      <Header isAuth={isAuth} />
      <div className={s.main}>{children}</div>
    </div>
  )
}
