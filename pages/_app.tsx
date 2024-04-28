import type { AppProps } from "next/app";

import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";

import { store } from "@/shared/assets/api/store";
import { WithNavigate } from "@/shared/assets/hoc/WithNavigate";
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

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <WithNavigate>
        <ToastContainer
          autoClose={5000}
          pauseOnHover
          position={"top-right"}
          rtl={false}
          theme={"dark"}
          transition={Bounce}
        />
        {getLayout(<Component {...pageProps} />)}
      </WithNavigate>
    </Provider>
  );
}
