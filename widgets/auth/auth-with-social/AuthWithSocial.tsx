import { GitHubBig, Google } from "@/public";
import Link from "next/link";

import s from "./authWithSocial.module.scss";

export const AuthWithSocial = () => {
  return (
    <div className={s.socials}>
      <Link aria-label={"sign in with Google"} href={""}>
        <Google />
      </Link>
      <Link aria-label={"sign in with GitHub"} href={""}>
        <GitHubBig />
      </Link>
    </div>
  );
};
