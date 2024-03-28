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
      <Link href={"./sign-up"}>sign Up</Link>
      <Link href={"./sign-in"}>sign In</Link>
      <Link href={"./terms-of-service"}>Terms Of Service</Link>
      <Link href={"./posts"}>Posts</Link>
      <Link href={"./privacy-policy"}>Privacy Policy</Link>
    </div>
  );
};
