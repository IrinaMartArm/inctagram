import { FC, PropsWithChildren } from "react";

import { useRouter } from "next/router";

export const WithNavigate: FC<PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();
  const isAuth = false; // запрос за данными пользователя

  if (!isAuth) {
    router.push("");
  }

  return <>{children}</>;
};
