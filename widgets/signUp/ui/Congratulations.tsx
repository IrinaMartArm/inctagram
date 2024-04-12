import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { Button, PageWrapper, Typography } from "@/shared/components";
import Image from "next/image";
import Link from "next/link";

import s from "./signUp.module.scss";

export const Congratulations = () => {
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <Typography variant={"h1"}>{t.signup.congratulations}</Typography>
      <Typography className={s.confirmed} variant={"regular_text-16"}>
        {t.signup.confirmed}
      </Typography>
      <Button as={Link} className={s.btn} href={"./profile"}>
        {t.signup.signIn}
      </Button>
      <Image
        alt={"Congratulations!"}
        className={s.image}
        height={300}
        src={"/images/Girl.png"}
        width={432}
      />
    </PageWrapper>
  );
};
