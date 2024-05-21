import { FC, PropsWithChildren, useEffect } from "react";

import { authActions } from "@/entities";
import { useMeQuery } from "@/shared/assets/api/auth/auth-api";
import { useAppDispatch } from "@/shared/assets/api/store";
import { Paths, commonRoutes } from "@/shared/assets/paths";
import { Loader } from "@/shared/components";
import { useRouter } from "next/router";

export const WithNavigate: FC<PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();
  const { data: isAuth, isLoading } = useMeQuery();
  const dispatch = useAppDispatch();

  const remainingPath: string = router.pathname.replace(
    /^\/profile(\/[^/]+)?|\/profile\?(.+)/,
    "/profile",
  );

  const isProtectedPage: boolean = !commonRoutes.includes(remainingPath);

  useEffect(() => {
    if (
      (!isLoading && !isAuth && isProtectedPage) ||
      router.pathname === "./github"
    ) {
      router.push(Paths.MAIN);
    }

    if (router.pathname === Paths.HOME) {
      router.replace(Paths.MAIN);
    }

    if (isAuth) {
      dispatch(authActions.setIsAuth(true));
    }

    return;
  }, [isAuth, isProtectedPage, router, isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};
