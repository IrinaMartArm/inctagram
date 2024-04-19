import { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";

import { store } from "@/shared/assets/api/store";
import { MainSideBar } from "@/widgets/sideBar/ui";
import { NextPage } from "next";

import s from "./../layout.module.scss";

import { Layout } from "../Layout";

export const MainLayout: NextPage<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <Provider store={store}>
      <div className={s.container}>
        <MainSideBar />
        <Layout>{children}</Layout>
      </div>
    </Provider>
  );
};

export const getMainLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
