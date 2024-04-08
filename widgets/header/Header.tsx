import { Navigation } from "@/shared/components/navigation/Navigation";
import { LangSelect } from "@/shared/components/select/langSelect/LangSelect";

import s from "./header.module.scss";
export const Header = () => {
  return (
    <div className={s.root}>
      <div className={s.header}>
        <p className={s.logo}>Inctagram</p>
        <Navigation />
        <LangSelect />
      </div>
    </div>
  );
};
