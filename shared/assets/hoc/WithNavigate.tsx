import { FC, PropsWithChildren, useEffect } from "react";

import { authActions } from "@/entities";
import { useMeQuery } from "@/shared/assets/api/auth/auth-api";
import { useAppDispatch } from "@/shared/assets/api/store";
import {
  Paths,
  authRoutes,
  commonRoutes,
} from "@/shared/assets/constants/paths";
import { Loader } from "@/shared/components";
import { useRouter } from "next/router";

export const WithNavigate: FC<PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();
  const { data: isAuth, isLoading } = useMeQuery(undefined);

  const userId = isAuth?.userId;
  const dispatch = useAppDispatch();

  const remainingPath: string = router.pathname.replace(
    /^\/profile(\/[^/]+)?|\/profile\?(.+)/,
    Paths.PROFILE + `/${userId}`,
  );

  const isProtectedPage: boolean =
    !commonRoutes.includes(remainingPath) &&
    !authRoutes.includes(remainingPath);

  const isAuthPage: boolean = authRoutes.includes(router.pathname);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuth && isProtectedPage) {
        router.push(Paths.MAIN);
      } else if (isAuth && isAuthPage) {
        router.push(`${Paths.PROFILE}/?id=${userId!}`);
      } else if (isAuth) {
        dispatch(authActions.setIsAuth(true));
      }
    }
  }, [
    isAuth,
    isProtectedPage,
    isAuthPage,
    router,
    isLoading,
    userId,
    dispatch,
  ]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};
