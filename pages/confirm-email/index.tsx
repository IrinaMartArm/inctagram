import { useCallback, useLayoutEffect } from "react";

import { ParsedUrlQuery } from "querystring";

import { useRegistrationConfirmationMutation } from "@/shared/assets/api/auth/auth-api";
import { handleErrorResponse } from "@/shared/assets/helpers/handleErrorResponse";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { Button, Loader, PageWrapper, Typography } from "@/shared/components";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { Verification } from "@/widgets";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import s from "@/widgets/email-verification/ui/verification.module.scss";

const Confirmed = () => {
  const { t } = useTranslation();
  const { confirmed, congratulations, signIn } = t.signUp;
  const router = useRouter();
  const [registrationConfirmation, { error, isLoading }] =
    useRegistrationConfirmationMutation();

  const Confirmation = useCallback(async () => {
    const query: ParsedUrlQuery = router.query;
    const code = query.code as string;

    try {
      if (code) {
        await registrationConfirmation({ code: code });
      }
    } catch (error: any) {
      handleErrorResponse(error);
    }
  }, [registrationConfirmation, router]);

  useLayoutEffect(() => {
    Confirmation();
  }, [Confirmation]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Verification />;
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
