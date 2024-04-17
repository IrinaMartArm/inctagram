import { PropsWithChildren } from "react";

import { Header } from "@/widgets/header/Header";
import { NextPage } from "next";

import s from "./layout.module.scss";

export const Layout: NextPage<PropsWithChildren> = (props) => {
  const { children } = props;

  // const { data, error, isLoading } = useMeQuery();
  // const isAuthenticated = !error && !isLoading;
  //
  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <div className={s.root}>
      <Header />
      <div className={s.main}>{children}</div>
    </div>
  );
};
