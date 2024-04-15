import { FC, PropsWithChildren } from "react";

import { useMeQuery } from "@/shared/assets/api/auth/auth-api";
import { Loader } from "@/shared/components";
import { useRouter } from "next/router";

export const WithNavigate: FC<PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();
  const { data: isAuth, error, isLoading } = useMeQuery();
  const isAuthenticated = !error && !isLoading;

  if (isLoading) {
    return <Loader />;
  }
  // const isAuth = data.userId; // запрос за данными пользователя

  if (!isAuth) {
    router.push("/sign-up");
  }

  return <>{children}</>;
};
