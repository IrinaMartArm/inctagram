import { Bell } from "@/public";
import { Button } from "@/shared/components/button";
import { Navigation } from "@/shared/components/navigation/Navigation";
import { LangSelect } from "@/shared/components/select/langSelect/LangSelect";
import { useRouter } from "next/router";

import s from "./header.module.scss";
export const Header = () => {
  const { pathname: currentPath } = useRouter();

  const publicPage = currentPath === "/";
  const messagesCount = 16;

  return (
    <div className={s.root}>
      <div className={s.header}>
        <p className={s.logo}>Inctagram</p>
        <Navigation />
        {publicPage ? (
          <div className={s.buttons}>
            <LangSelect />
            <div className={s.buttonsBox}>
              <Button variant={"link"}>Log in</Button>
              <Button>Sign up</Button>
            </div>
          </div>
        ) : (
          <div className={s.bell}>
            <div className={s.bellMessage}>{messagesCount}</div>
            <Bell />
            <LangSelect />
          </div>
        )}
      </div>
    </div>
  );
};
