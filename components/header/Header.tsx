import { Navigation } from "@/components/navigation/Navigation";

import s from "./header.module.scss";
export const Header = () => {
  return (
    <div className={s.root}>
      <div className={s.header}>
        <p className={s.logo}>Inctagram</p>
        <Navigation />
      </div>
    </div>
  );
};
