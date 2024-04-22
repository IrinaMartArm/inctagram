import type { AppProps } from "next/app";

import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";

import { store } from "@/shared/assets/api/store";
import { useLoader } from "@/shared/assets/hooks/useLoader";
import { NextPage } from "next";

import "@/styles/index.scss";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

export type NextPageWithLayout<P = {}> = {
  getLayout?: (page: ReactElement) => ReactNode;
} & NextPage<P>;

type AppPropsWithLayout = {
  Component: NextPageWithLayout;
} & AppProps;

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useLoader();
  const getLayout = Component.getLayout
    ? (page: ReactElement) => (
        <Provider store={store}>{Component.getLayout!(page)} </Provider>
      )
    : (page: ReactElement) => <Provider store={store}>{page} </Provider>;

  return getLayout(<Component {...pageProps} />);
}
