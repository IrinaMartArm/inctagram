import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import { Layout } from '../Layout'

const BaseLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props

  return (
    <div>
      <Layout>{children}</Layout>
    </div>
  )
}

export const getLayout = (page: ReactElement) => {
  return <BaseLayout>{page}</BaseLayout>
}
