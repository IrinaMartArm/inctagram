import Link from "next/link";

export const Navigation = () => {
  return (
    <div>
      <Link href={"./"}>Home</Link>
      <Link href={"./favorites"}>favorites</Link>
      <Link href={"./general"}>general</Link>
      <Link href={"./messenger"}>messenger</Link>
      <Link href={"./profile"}>profile</Link>
      <Link href={"./search"}>search</Link>
      <Link href={"./statistics"}>statistics</Link>
      <Link href={"./signUp"}>signUp</Link>
      <Link href={"./signIn"}>signIn</Link>
    </div>
  );
};
