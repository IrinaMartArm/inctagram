import { userEmailSelector } from "@/entities/auth/model/auth-slice";
import {
  Bookmark_outline,
  Dialog,
  Home_outline,
  Person_outline,
  PlusSquare_outline,
  Search_outline,
  Statistics,
} from "@/public";
import { Paths } from "@/shared/assets";
import { useAppSelector } from "@/shared/assets/api/store";
import { useTranslation } from "@/shared/assets/hooks";
import { SideBar } from "@/shared/components";
import { LogOutModal } from "@/widgets";

import s from "./mainSideBar.module.scss";

import { NavLinks } from "./ui";

export const MainSideBar = () => {
  const { t } = useTranslation();
  const { create, favorites, home, messenger, myProfile, search, statistics } =
    t.menu;

  const basicPaths = [
    { icon: <Home_outline />, path: Paths.HOME, title: home },
    { icon: <PlusSquare_outline />, path: Paths.CREATE, title: create },
    { icon: <Person_outline />, path: Paths.PROFILE, title: myProfile },
    {
      icon: <Dialog />,
      path: Paths.MESSENGER,
      title: messenger,
    },
    { icon: <Search_outline />, path: Paths.SEARCH, title: search },
  ];

  const otherPaths = [
    { icon: <Statistics />, path: Paths.STATISTIC, title: statistics },
    {
      icon: <Bookmark_outline />,
      path: Paths.FAVORITES,
      title: favorites,
    },
  ];
  const email = useAppSelector(userEmailSelector);

  return (
    <SideBar>
      <div className={s.root}>
        <div className={s.box}>
          <NavLinks paths={basicPaths} />
          <NavLinks paths={otherPaths} />
        </div>

        <LogOutModal email={email} />
      </div>
    </SideBar>
  );
};
