import { ArrowLeft } from "@/public";
import { Button, Typography } from "@/shared/components";
import Link from "next/link";
import { useRouter } from "next/router";

import s from "./back.module.scss";

type Props = {
  text: string;
};
export const Back = ({ text }: Props) => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={s.root}>
      <Button className={s.link} onClick={handleGoBack} variant={"icon"}>
        <ArrowLeft />
        <Typography variant={"regular_text-14"}>{text}</Typography>
      </Button>
    </div>
  );
};
