import {
  Account,
  Bookmark_outline,
  Home_outline,
  Person_outline,
  PlusSquare_outline,
  Search_outline,
  TrendingUp,
} from "@/public";
import { RootState, useAppSelector } from "@/shared/assets/api/store";
import { Paths } from "@/shared/assets/paths";
import { SideBar } from "@/shared/components";
import { LogOutModal } from "@/widgets";

import s from "./mainSideBar.module.scss";

import { NavLinks } from "./ui";

const basicPaths = [
  { icon: <Home_outline />, path: Paths.MAIN, title: "Home" },
  { icon: <PlusSquare_outline />, path: Paths.CREATE, title: "Create" },
  { icon: <Person_outline />, path: Paths.PROFILE, title: "My Profile" },
  { icon: <Bookmark_outline />, path: Paths.MESSENGER, title: "Messenger" },
  { icon: <Search_outline />, path: Paths.SEARCH, title: "Search" },
];

const otherPaths = [
  { icon: <Account />, path: Paths.STATISTIC, title: "Statistics" },
  { icon: <TrendingUp />, path: Paths.FAVORITES, title: "Favorites" },
];

export const MainSideBar = () => {
  const email = useAppSelector((state: RootState) => state.auth.email);

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
