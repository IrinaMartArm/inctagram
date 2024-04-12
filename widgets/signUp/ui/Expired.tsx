import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { Button, PageWrapper, Typography } from "@/shared/components";
import Image from "next/image";
import Link from "next/link";

import s from "./signUp.module.scss";

export const Expired = () => {
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <Typography variant={"h1"}>{t.signup.expired}</Typography>
      <Typography className={s.expired} variant={"regular_text-16"}>
        {t.signup.sendAgain}
      </Typography>
      <Button as={Link} href={"./profile"}>
        {t.signup.resend}
      </Button>
      <Image
        alt={"Congratulations!"}
        className={s.boy}
        height={300}
        src={"/images/Boy.png"}
        width={432}
      />
    </PageWrapper>
  );
};
