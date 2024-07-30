import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { wrapper } from '@/shared/assets/api/store'
import { WithNavigate } from '@/shared/assets/hoc/WithNavigate'
import { useLoader } from '@/shared/assets/hooks/useLoader'
import { Toast } from '@/shared/components'
import { NextPage } from 'next'

import '@/styles/index.scss'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

export type NextPageWithLayout<P = {}> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { props, store } = wrapper.useWrappedStore(pageProps)

  useLoader()

  const getLayout = Component.getLayout ?? (page => page)

  return (
    <Provider store={store}>
      <WithNavigate>
        <Toast />
        {getLayout(<Component {...props} />)}
      </WithNavigate>
    </Provider>
  )
}
