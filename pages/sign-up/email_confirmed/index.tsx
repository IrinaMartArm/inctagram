import { useRegistrationConfirmationMutation } from "@/shared/assets/api/auth/auth-api";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { Button, Loader, PageWrapper, Typography } from "@/shared/components";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import s from "../signup.module.scss";

const Confirmed = () => {
  const { t } = useTranslation();
  const params = useParams();
  const [registrationConfirmation, { error, isLoading }] =
    useRegistrationConfirmationMutation();

  const Confirmation = () => {
    const code = Array.isArray(params.code) ? params.code[0] : params.code;

    registrationConfirmation({ code: code });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PageWrapper>
      <Typography variant={"h1"}>{t.signup.congratulations}</Typography>
      <Typography className={s.confirmed} variant={"regular_text-16"}>
        {t.signup.confirmed}
      </Typography>
      <Button as={Link} className={s.btn} href={"./sign-in"}>
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

Confirmed.getLayout = getLayout;
export default Confirmed;
