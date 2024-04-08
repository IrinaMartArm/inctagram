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

import s from "./mainSideBar.module.scss";

export const MainSideBar = () => {
  return (
    <SideBar>
      <div className={s.root}>
        <div className={s.box}>
          <div className={s.pages}>
            <div className={s.row}>
              <Home_outline />
              <div>Home</div>
            </div>
            <div className={s.row}>
              <PlusSquare_outline />
              <div>Create</div>
            </div>
            <div className={s.row}>
              <Person_outline />
              <div>My Profile</div>
            </div>
            <div className={s.row}>
              <Bookmark_outline />
              <div>Messenger</div>
            </div>
            <div className={s.row}>
              <Search_outline />
              <div>Search</div>
            </div>
          </div>
          <div className={s.pages}>
            <div className={s.row}>
              <TrendingUp />
              <div>Statistics</div>
            </div>
            <div className={s.row}>
              <Account />
              <div>Favorites</div>
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
