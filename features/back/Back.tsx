import { ArrowLeft } from "@/public";
import { Typography } from "@/shared/components";
import Link from "next/link";

import s from "./back.module.scss";

type Props = {
  href: string;
  text: string;
};
export const Back = ({ href, text }: Props) => {
  return (
    <div className={s.root}>
      <Link className={s.link} href={href}>
        <ArrowLeft />
        <Typography variant={"regular_text-14"}>{text}</Typography>
      </Link>
    </div>
  );
};
