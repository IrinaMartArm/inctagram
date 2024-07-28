import { PropsWithChildren, ReactElement } from 'react'

import { useMeQuery } from '@/shared/assets/api/auth/auth-api'
import { TABLET_BREAKPOINT } from '@/shared/assets/constants'
import { useIsMobile } from '@/shared/assets/hooks'
import { MainSideBar, MobileMenuBar } from '@/widgets'
import { NextPage } from 'next'

import s from './../layout.module.scss'

import { Layout } from '../Layout'

const MixLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props
  const isMobile = useIsMobile(TABLET_BREAKPOINT)
  const { data: me } = useMeQuery()

  return (
    <div className={s.container}>
      {me && (
        <>
          {!isMobile && <MainSideBar />}
          {isMobile && <MobileMenuBar />}
        </>
      )}

      <Layout>{children}</Layout>
    </div>
  )
}

export const getMixLayout = (page: ReactElement) => {
  return <MixLayout>{page}</MixLayout>
}
