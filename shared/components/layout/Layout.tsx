import { PropsWithChildren } from "react";

import { Header } from "@/widgets/header/Header";
import { NextPage } from "next";

import s from "./layout.module.scss";

export const Layout: NextPage<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <div className={s.root}>
      <Header />
      <div className={s.main}>{children}</div>
    </div>
  );
};
