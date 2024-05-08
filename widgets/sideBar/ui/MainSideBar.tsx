import {
  Account,
  Bookmark_outline,
  Home_outline,
  Person_outline,
  PlusSquare_outline,
  Search_outline,
  TrendingUp,
} from "@/public";
import { SideBar } from "@/shared/components/sideBar/SideBar";
import { LogOutModal } from "@/widgets";
import { clsx } from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

import s from "./mainSideBar.module.scss";

export const MainSideBar = () => {
  const isActive = (pathname: string, currentPath: string) => {
    return currentPath === pathname;
  };
  const { pathname: currentPath } = useRouter();

  return (
    <SideBar>
      <div className={s.root}>
        <div className={s.box}>
          <div className={s.pages}>
            <div
              className={clsx(
                s.row,
                isActive("/main", currentPath) && s.active,
              )}
            >
              <Home_outline />
              <Link
                className={isActive("/main", currentPath) ? s.active : s.link}
                href={"./main"}
                passHref
              >
                Home
              </Link>
            </div>
            <div className={s.row}>
              <PlusSquare_outline />
              <div>Create</div>
            </div>
            <div
              className={clsx(
                s.row,
                isActive("/profile", currentPath) && s.active,
              )}
            >
              <Person_outline />
              <Link
                className={
                  isActive("/profile", currentPath) ? s.active : s.link
                }
                href={"./profile"}
              >
                My Profile
              </Link>
            </div>
            <div
              className={clsx(
                s.row,
                isActive("/messenger", currentPath) && s.active,
              )}
            >
              <Bookmark_outline />
              <Link
                className={
                  isActive("/messenger", currentPath) ? s.active : s.link
                }
                href={"./messenger"}
              >
                Messenger
              </Link>
            </div>
            <div
              className={clsx(
                s.row,
                isActive("/search", currentPath) && s.active,
              )}
            >
              <Search_outline />
              <Link
                className={isActive("/search", currentPath) ? s.active : s.link}
                href={"./search"}
              >
                Search
              </Link>
            </div>
          </div>
          <div className={s.pages}>
            <div
              className={clsx(
                s.row,
                isActive("/statistics", currentPath) && s.active,
              )}
            >
              <TrendingUp />
              <Link
                className={
                  isActive("/statistics", currentPath) ? s.active : s.link
                }
                href={"./statistics"}
              >
                Statistics
              </Link>
            </div>
            <div
              className={clsx(
                s.row,
                isActive("/favorites", currentPath) && s.active,
              )}
            >
              <Account />
              <Link
                className={
                  isActive("/favorites", currentPath) ? s.active : s.link
                }
                href={"./favorites"}
              >
                Favorites
              </Link>
            </div>
          </div>
        </div>
        <div className={s.row}>
          <LogOutModal email={"заглушка@gmail.com"} />
        </div>
      </div>
    </SideBar>
  );
};
