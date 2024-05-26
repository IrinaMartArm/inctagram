import { authActions } from "@/entities";
import { useLogoutMutation } from "@/shared/assets/api/auth/auth-api";
import { useAppDispatch } from "@/shared/assets/api/store";
import { handleErrorResponse } from "@/shared/assets/helpers";
import { useTranslation } from "@/shared/assets/hooks";
import { useRouter } from "next/router";

export const useLogOut = () => {
  const { t } = useTranslation();
  const [logOut] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logOutCallback = () => {
    logOut().then((res) => {
      if ("error" in res) {
        return handleErrorResponse(res.error);
      } else {
        router.push("/");
        dispatch(authActions.setEmail());
        dispatch(authActions.setIsAuth(false));
      }
    });
  };

  return {
    logOutCallback,
    t,
  };
};
