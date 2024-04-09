import { Bell } from "@/public";
import { Button } from "@/shared/components/button";
import { Navigation } from "@/shared/components/navigation/Navigation";
import { LangSelect } from "@/shared/components/select/langSelect/LangSelect";

import s from "./header.module.scss";
export const Header = () => {
  const isAuth = true;

  return (
    <div className={s.root}>
      <div className={s.header}>
        <p className={s.logo}>Inctagram</p>
        <Navigation />
        {isAuth ? (
          <div className={s.bell}>
            <Bell />
            <LangSelect />
          </div>
        ) : (
          <div className={s.buttons}>
            <LangSelect />
            <div className={s.buttonsBox}>
              <Button variant={"link"}>Log in</Button>
              <Button>Sign up</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
