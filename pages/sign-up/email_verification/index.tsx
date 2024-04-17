import { useEmailResendingMutation } from "@/shared/assets/api/auth/auth-api";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { Button, PageWrapper, Typography } from "@/shared/components";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import Image from "next/image";

import s from "../signup.module.scss";

const Verification = () => {
  const { t } = useTranslation();

  const [resending] = useEmailResendingMutation();
  const email = "";

  const resendingHandler = () => {
    resending({ email: email });
  };

  return (
    <PageWrapper>
      <Typography className={s.title} variant={"h1"}>
        {t.signup.expired}
      </Typography>
      <Typography className={s.expired} variant={"regular_text-16"}>
        {t.signup.sendAgain}
      </Typography>
      <Button onClick={resendingHandler}>{t.signup.resend}</Button>
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

Verification.getLayout = getLayout;
export default Verification;
