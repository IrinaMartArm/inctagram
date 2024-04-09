import {
  Account,
  Bookmark_outline,
  Home_outline,
  LogOut_outline,
  Person_outline,
  PlusSquare_outline,
  Search_outline,
  TrendingUp,
} from "@/public";
import { SideBar } from "@/shared/components/sideBar/SideBar";
import Link from "next/link";

import s from "./mainSideBar.module.scss";

export const MainSideBar = () => {
  return (
    <SideBar>
      <div className={s.root}>
        <div className={s.box}>
          <div className={s.pages}>
            <div className={s.row}>
              <Home_outline />
              <Link href={"./"}>Home</Link>
            </div>
            <div className={s.row}>
              <PlusSquare_outline />
              <div>Create</div>
            </div>
            <div className={s.row}>
              <Person_outline />
              <Link href={"./profile"}>My Profile</Link>
            </div>
            <div className={s.row}>
              <Bookmark_outline />
              <Link href={"./messenger"}>Messenger</Link>
            </div>
            <div className={s.row}>
              <Search_outline />
              <Link href={"./search"}>Search</Link>
            </div>
          </div>
          <div className={s.pages}>
            <div className={s.row}>
              <TrendingUp />
              <Link href={"./statistics"}>Statistics</Link>
            </div>
            <div className={s.row}>
              <Account />
              <Link href={"./favorites"}>Favorites</Link>
            </div>
          </div>
        </div>
        <div>
          <div className={s.row}>
            <LogOut_outline />
            <div>Log Out</div>
          </div>
        </div>
      </div>
    </SideBar>
  );
};
