import type { AppProps } from "next/app";

import { ReactElement, ReactNode, useState } from "react";

import { useLoader } from "@/shared/assets/hooks/useLoader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";

import "@/styles/index.scss";
import "@/styles/globals.scss";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());

  useLoader();
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>,
  );
}
