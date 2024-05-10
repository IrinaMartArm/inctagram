import { Bell } from "@/public";
import { MOBILE_BREAKPOINT } from "@/shared/assets/constants";
import { useIsMobile } from "@/shared/assets/hooks";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { Button } from "@/shared/components/button";
import { LangSelect } from "@/shared/components/select/langSelect/LangSelect";
import Link from "next/link";
import { useRouter } from "next/router";

import s from "./header.module.scss";

export const Header = () => {
  const { pathname: currentPath } = useRouter();
  const { t } = useTranslation();
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);

  const publicPage = currentPath === "/";
  const messagesCount = 2;
  const isShowMessagesCont = !isMobile && messagesCount > 0;

  return (
    <div className={s.root}>
      <div className={s.header}>
        <Link className={s.logo} href={"./"}>
          Inctagram
        </Link>
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
            {isShowMessagesCont && (
              <div className={s.bellMessage}>{messagesCount}</div>
            )}
            {!isMobile && <Bell />}
            <LangSelect />
          </div>
        )}
      </div>
    </div>
  );
};
