import { LangSelect } from "@/features";
import { More } from "@/public";
import { MOBILE_BREAKPOINT, Paths } from "@/shared/assets/constants";
import { useIsMobile, useTranslation } from "@/shared/assets/hooks";
import { Button } from "@/shared/components";
import Link from "next/link";
import { useRouter } from "next/router";

import s from "./header.module.scss";

import { Notifications } from "./ui";

const NOTIFICATIONS_COUNT = 5;

export const Header = () => {
  const { pathname: currentPath } = useRouter();
  const { t } = useTranslation();
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);

  const publicPage = currentPath === Paths.HOME;

  return (
    <div className={s.root}>
      <div className={s.header}>
        <Link className={s.logo} href={Paths.HOME}>
          Inctagram
        </Link>
        {publicPage && (
          <div className={s.buttons}>
            <LangSelect />
            <div className={s.buttonsBox}>
              <Button as={Link} href={Paths.LOGIN} variant={"link"}>
                {t.signUp.signIn}
              </Button>
              <Button as={Link} href={Paths.REGISTRATION}>
                {t.signUp.title}
              </Button>
            </div>
          </div>
        )}
        {!publicPage && (
          <div className={s.wrapper}>
            {!isMobile && (
              <Notifications notificationsCount={NOTIFICATIONS_COUNT} />
            )}
            <LangSelect />
            {isMobile && (
              <button>
                <More />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
