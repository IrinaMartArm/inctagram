import { useState } from "react";

import { useEmailResendingMutation } from "@/shared/assets/api/auth/auth-api";
import { handleErrorResponse } from "@/shared/assets/helpers/handleErrorResponse";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { Button, PageWrapper, Typography } from "@/shared/components";
import { Modal } from "@/shared/components/modals";
import { EmailSent } from "@/widgets";
import Image from "next/image";

import s from "./verification.module.scss";

export const Verification = () => {
  const { t } = useTranslation();
  const { expired, resend, sendAgain } = t.signUp;

  const [resending] = useEmailResendingMutation();
  let email: string = "";

  if (typeof window !== "undefined") {
    email = localStorage.getItem("email") || "";
  }

  const [open, setOpen] = useState(false);
  const onOpenChangeHandler = () => {
    setOpen(false);
  };

  const resendingHandler = () => {
    try {
      resending({ email: email || "" }).unwrap();
      setOpen(true);
    } catch (err: any) {
      handleErrorResponse(err);
    }
  };

  return (
    <PageWrapper>
      <Typography className={s.title} variant={"h1"}>
        {expired}
      </Typography>
      <Typography className={s.expired} variant={"regular_text-16"}>
        {sendAgain}
      </Typography>
      <Modal
        onOpenChange={onOpenChangeHandler}
        open={open}
        title={"Email sent"}
        trigger={<Button onClick={resendingHandler}>{resend}</Button>}
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
