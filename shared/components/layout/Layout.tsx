import { PropsWithChildren } from "react";
import { Bounce, ToastContainer } from "react-toastify";

import { Header } from "@/widgets/header/Header";
import { NextPage } from "next";

import "react-toastify/dist/ReactToastify.css";

import s from "./layout.module.scss";

export const Layout: NextPage<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <div className={s.root}>
      <Header />
      <ToastContainer
        autoClose={5000}
        closeOnClick
        draggable={false}
        hideProgressBar={false}
        pauseOnFocusLoss={false}
        pauseOnHover
        position={"top-right"}
        rtl={false}
        theme={"dark"}
        transition={Bounce}
      />
      <div className={s.main}>{children}</div>
    </div>
  );
};
