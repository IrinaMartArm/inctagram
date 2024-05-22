import {
  Dialog,
  Home_outline,
  Person_outline,
  PlusSquare_outline,
  Search_outline,
} from "@/public";
import { Paths } from "@/shared/assets/paths";
import { NavLink } from "@/shared/components";

import s from "./MobileMenuBar.module.scss";

const paths = [
  { icon: <Home_outline />, path: Paths.MAIN, title: "Home" },
  { icon: <PlusSquare_outline />, path: Paths.CREATE, title: "Create" },
  { icon: <Dialog />, path: Paths.MESSENGER, title: "Messenger" },
  { icon: <Search_outline />, path: Paths.SEARCH, title: "Search" },
  { icon: <Person_outline />, path: Paths.PROFILE, title: "My Profile" },
];

export const MobileMenuBar = () => {
  return (
    <div className={s.wrapper}>
      {paths.map((path) => (
        <NavLink isTextHidden key={path.title} path={path} />
      ))}
    </div>
  );
};
