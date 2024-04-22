import { useCallback, useEffect } from "react";

import { useRegistrationConfirmationMutation } from "@/shared/assets/api/auth/auth-api";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { Button, Loader, PageWrapper, Typography } from "@/shared/components";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import s from "../sign-up/signup.module.scss";

const Confirmed = () => {
  const { t } = useTranslation();
  const { confirmed, congratulations, signIn } = t.signUp;
  const router = useRouter();
  const [registrationConfirmation, { error, isLoading }] =
    useRegistrationConfirmationMutation();

  const Confirmation = useCallback(async () => {
    const code = Array.isArray(router.query) ? router.query[0] : router.query;

    await registrationConfirmation(code);
  }, [registrationConfirmation, router.query]);

  useEffect(() => {
    Confirmation();
  }, [Confirmation]);

  if (isLoading) {
    return <Loader />;
  }

  const { status } = error as FetchBaseQueryError;

  if (status === 400) {
    router.replace("./email-verification");
  }

  return (
    <PageWrapper>
      <Typography variant={"h1"}>{congratulations}</Typography>
      <Typography className={s.confirmed} variant={"regular_text-16"}>
        {confirmed}
      </Typography>
      <Button as={Link} className={s.btn} href={"./../../sign-in"}>
        {signIn}
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

Confirmed.getLayout = getLayout;
export default Confirmed;
