import { useTranslation } from "@/shared/assets/hooks";
import { Paths } from "@/shared/assets/paths";
import { Button, Typography } from "@/shared/components";
import Image from "next/image";
import Link from "next/link";

import s from "./emailConfirmed.module.scss";

export const EmailConfirmedCard = () => {
  const { t } = useTranslation();
  const { confirmed, congratulations, signIn } = t.signUp;

  return (
    <div className={s.wrapper}>
      <Typography variant={"h1"}>{congratulations}</Typography>
      <Typography className={s.confirmed} variant={"regular_text-16"}>
        {confirmed}
      </Typography>
      <Button as={Link} className={s.btn} href={Paths.LOGIN}>
        {signIn}
      </Button>
      <Image
        alt={"Congratulations!"}
        className={s.image}
        height={300}
        src={"/images/Girl.png"}
        width={432}
      />
    </div>
  );
};
