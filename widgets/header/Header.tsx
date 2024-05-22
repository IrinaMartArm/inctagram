import { Bell } from "@/public";
import { commonRoutes } from "@/shared/assets/constants/paths";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { Button } from "@/shared/components/button";
import { LangSelect } from "@/shared/components/select/langSelect/LangSelect";
import Link from "next/link";
import { useRouter } from "next/router";

import s from "./header.module.scss";
export const Header = () => {
  const { pathname: currentPath } = useRouter();
  const { t } = useTranslation();

  const publicPage = currentPath === "/";
  const messagesCount = 0;

  return (
    <div className={s.root}>
      <div className={s.header}>
        <p className={s.logo}>Inctagram</p>
        {publicPage ? (
          <div className={s.buttons}>
            <LangSelect />
            <div className={s.buttonsBox}>
              <Button as={Link} href={"./sign-in"} variant={"link"}>
                Log in
              </Button>
              <Button as={Link} href={"./sign-up"}>
                {t.signUp.title}
              </Button>
            </div>
          </div>
        ) : (
          <div className={s.bell}>
            {messagesCount > 0 && (
              <div className={s.bellMessage}>{messagesCount}</div>
            )}
            <Bell />
            <LangSelect />
          </div>
        )}
      </div>
    </div>
  );
};
