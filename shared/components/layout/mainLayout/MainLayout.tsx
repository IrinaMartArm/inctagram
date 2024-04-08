import { PropsWithChildren, ReactElement } from "react";

import { MainSideBar } from "@/widgets/sideBar/ui";
import { NextPage } from "next";

import { Layout } from "../Layout";

export const MainLayout: NextPage<PropsWithChildren> = (props) => {
  const { children } = props;

  return <Layout>{children}</Layout>;
};

export const getMainLayout = (page: ReactElement) => {
  return (
    <MainLayout>
      <MainSideBar />
      {page}
    </MainLayout>
  );
};
