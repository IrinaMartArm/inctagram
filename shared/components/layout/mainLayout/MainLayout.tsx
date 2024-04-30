import { PropsWithChildren, ReactElement } from "react";

import { MainSideBar } from "@/widgets/sideBar/ui";
import { NextPage } from "next";

import s from "./../layout.module.scss";

import { Layout } from "../Layout";

const MainLayout: NextPage<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <div className={s.container}>
      <MainSideBar />
      <Layout>{children}</Layout>
    </div>
  );
};

export const getMainLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
