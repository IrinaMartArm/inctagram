import { PropsWithChildren, ReactElement } from "react";

import { NextPage } from "next";

import { Layout } from "../Layout";

export const AdminLayout: NextPage<PropsWithChildren> = (props) => {
  const { children } = props;

  return <Layout>{children}</Layout>;
};
export const getAdminLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>;
};
