import { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import s from './sideBar.module.scss'
export const SideBar: NextPage<PropsWithChildren> = ({ children }) => {
  return <div className={s.root}>{children}</div>
}
