import { useLogoutMutation } from "@/shared/assets/api/auth/auth-api";
import { handleErrorResponse } from "@/shared/assets/helpers/handleErrorResponse";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { useRouter } from "next/router";

export const useLogOut = () => {
  const { t } = useTranslation();
  const [logOut, { isLoading }] = useLogoutMutation();
  const router = useRouter();
  const logOutCallback = () => {
    logOut().then((res) => {
      if ("error" in res) {
        return handleErrorResponse(res.error);
      } else {
        router.push("/");
      }
    });
  };

  return {
    logOutCallback,
    t,
  };
};
