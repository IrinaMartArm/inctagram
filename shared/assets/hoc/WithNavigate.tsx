import { FC, PropsWithChildren, useEffect } from "react";

import { useMeQuery } from "@/shared/assets/api/auth/auth-api";
import { Paths, authRoutes, commonRoutes } from "@/shared/assets/paths";
import { Loader } from "@/shared/components";
import { useRouter } from "next/router";

export const WithNavigate: FC<PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();
  const { data: isAuth, isLoading } = useMeQuery(undefined);

  const userId = isAuth?.userId;

  const remainingPath: string = router.pathname.replace(
    /^\/profile(\/[^/]+)?|\/profile\?(.+)/,
    Paths.PROFILE + `/${userId}`,
  );

  const isProtectedPage: boolean =
    !commonRoutes.includes(remainingPath) &&
    !authRoutes.includes(remainingPath);

  const isAuthPage: boolean =
    !commonRoutes.includes(remainingPath) && !remainingPath;

  useEffect(() => {
    if (
      !isLoading &&
      !isAuth &&
      isProtectedPage
      // router.pathname === "/github"
    ) {
      router.push(Paths.MAIN);
    }
    if (!isLoading && isAuth && isAuthPage) {
      const userId = isAuth?.userId;

      router.push(Paths.PROFILE + `/${userId}`);
    }

    return;
  }, [isAuth, isProtectedPage, router, isLoading, isAuthPage]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};
