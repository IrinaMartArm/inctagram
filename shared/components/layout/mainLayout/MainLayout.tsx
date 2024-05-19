import { PropsWithChildren, ReactElement } from "react";

import { TABLET_BREAKPOINT } from "@/shared/assets/constants";
import { useIsMobile } from "@/shared/assets/hooks";
import { MainSideBar } from "@/widgets/sideBar/ui";
import { NextPage } from "next";

import s from "./../layout.module.scss";

import { Layout } from "../Layout";

const MainLayout: NextPage<PropsWithChildren> = (props) => {
  const { children } = props;
  const isMobile = useIsMobile(TABLET_BREAKPOINT);

  return (
    <div className={s.container}>
      {!isMobile && <MainSideBar />}
      <Layout>{children}</Layout>
    </div>
  );
};

export const getMainLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
