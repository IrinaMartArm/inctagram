import { useState } from "react";

import { useEmailResendingMutation } from "@/shared/assets/api/auth/auth-api";
import { MOBILE_BREAKPOINT } from "@/shared/assets/constants";
import { handleErrorResponse } from "@/shared/assets/helpers/handleErrorResponse";
import { useIsMobile, useTranslationPages } from "@/shared/assets/hooks";
import { Button, PageTitle, Typography } from "@/shared/components";
import { Modal } from "@/shared/components/modals";
import { EmailSent } from "@/widgets";
import Image from "next/image";

import s from "./verification.module.scss";

export const Verification = () => {
  const { t } = useTranslationPages();

  const [resending] = useEmailResendingMutation();

  const isMobile = useIsMobile(MOBILE_BREAKPOINT);

  const imageHeight = isMobile ? 230 : 300;
  const imageWidth = isMobile ? 330 : 432;
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
    <div className={s.wrapper}>
      <PageTitle className={s.title} textAlign={"center"} title={t.title} />
      <Typography className={s.expired} variant={"regular_text-16"}>
        {t.description}
      </Typography>
      <div className={s.imageWithButton}>
        <Modal
          onOpenChange={onOpenChangeHandler}
          open={open}
          title={"Email sent"}
          trigger={
            <Button className={s.btn} onClick={resendingHandler}>
              {t.titleButton}
            </Button>
          }
        >
          <EmailSent email={email || ""} />
        </Modal>
        <Image
          alt={"Congratulations!"}
          className={s.image}
          height={imageHeight}
          src={"/images/Boy.png"}
          width={imageWidth}
        />
      </div>
    </div>
  );
};
