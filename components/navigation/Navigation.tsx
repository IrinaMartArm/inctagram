import TermsOfService from "@/pages/termsOfService";
import Link from "next/link";

import s from "./navigation.module.scss";

export const Navigation = () => {
  return (
    <div className={s.root}>
      <Link href={"./"}>Home</Link>
      <Link href={"./favorites"}>favorites</Link>
      <Link href={"./general"}>general</Link>
      <Link href={"./messenger"}>messenger</Link>
      <Link href={"./profile"}>profile</Link>
      <Link href={"./search"}>search</Link>
      <Link href={"./statistics"}>statistics</Link>
      <Link href={"./signUp"}>signUp</Link>
      <Link href={"./signIn"}>signIn</Link>
      <Link href={"./termsOfService"}>Terms Of Service</Link>
      <Link href={"./posts"}>Posts</Link>
    </div>
  );
};
