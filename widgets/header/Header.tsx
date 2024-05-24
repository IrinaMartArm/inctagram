import { LangSelect } from "@/features";
import { More } from "@/public";
import { MOBILE_BREAKPOINT, Paths } from "@/shared/assets/constants";
import { useIsMobile, useTranslation } from "@/shared/assets/hooks";
import { Button } from "@/shared/components";
import Link from "next/link";

import s from "./header.module.scss";

import { Notifications } from "./ui";

const NOTIFICATIONS_COUNT = 5;

type Props = {
  isAuth: boolean;
};

export const Header = ({ isAuth }: Props) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);

  const publicPage = currentPath === Paths.MAIN;

  return (
    <div className={s.root}>
      <div className={s.header}>
        <Link className={s.logo} href={Paths.MAIN}>
          Inctagram
        </Link>
        {!isAuth && !isMobile && (
          <div className={s.buttons}>
            <LangSelect />
            <div className={s.buttonsBox}>
              <Button as={Link} href={Paths.LOGIN} variant={"link"}>
                {t.signIn}
              </Button>
              <Button as={Link} href={Paths.REGISTRATION}>
                {t.signUp}
              </Button>
            </div>
          </div>
        )}
        {isAuth && (
          <div className={s.wrapper}>
            {!isMobile && (
              <Notifications notificationsCount={NOTIFICATIONS_COUNT} />
            )}
            <LangSelect />
          </div>
        )}
        {isMobile && (
          <button>
            <More />
          </button>
        )}
      </div>
    </div>
  );
};
