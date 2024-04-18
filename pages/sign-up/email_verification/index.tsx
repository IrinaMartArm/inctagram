import { useEmailResendingMutation } from "@/shared/assets/api/auth/auth-api";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { Button, PageWrapper, Typography } from "@/shared/components";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { Modal } from "@/shared/components/modals";
import { EmailSent } from "@/widgets";
import Image from "next/image";

import s from "../signup.module.scss";

const Verification = () => {
  const { t } = useTranslation();

  const [resending] = useEmailResendingMutation();
  let email: string = "";

  if (typeof window !== "undefined") {
    email = localStorage.getItem("email") || "";
  }

  const resendingHandler = () => {
    resending({ email: email || "" });
  };

  return (
    <PageWrapper>
      <Typography className={s.title} variant={"h1"}>
        {t.signup.expired}
      </Typography>
      <Typography className={s.expired} variant={"regular_text-16"}>
        {t.signup.sendAgain}
      </Typography>
      <Modal
        title={"Email sent"}
        trigger={<Button onClick={resendingHandler}>{t.signup.resend}</Button>}
      >
        <EmailSent email={email || ""} />
      </Modal>
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
