import { PropsWithChildren } from "react";

import { Header } from "@/widgets";
import { NextPage } from "next";

import "react-toastify/dist/ReactToastify.css";

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
