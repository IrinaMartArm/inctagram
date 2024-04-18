import type { AppProps } from "next/app";

import { ReactElement, ReactNode, useState } from "react";

import { useLoader } from "@/shared/assets/hooks/useLoader";
import { ReduxProvider } from "@/shared/components";
import { NextPage } from "next";

import "@/styles/index.scss";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useLoader();
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <ReduxProvider>
      <Component {...pageProps} />
    </ReduxProvider>,
  );
}
