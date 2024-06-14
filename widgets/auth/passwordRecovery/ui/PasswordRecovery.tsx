import ReCAPTCHAWidget from "@/pages/auth/password-recovery/recaptcha";
import { Paths } from "@/shared/assets";
import {
  Button,
  Card,
  ControlledTextField,
  PageTitle,
  Typography,
} from "@/shared/components";
import { usePasswordRecovery } from "@/widgets/auth/passwordRecovery/hook/usePasswordRecovery";
import Link from "next/link";

import s from "./passwordRecovery.module.scss";

export const PasswordRecovery = () => {
  const {
    control,
    errors,
    handleRecaptchaChange,
    handleSubmit,
    isChecked,
    isSuccess,
    isValid,
    onRecovery,
    t,
  } = usePasswordRecovery();

  return (
    <Card as={"form"} onSubmit={handleSubmit(onRecovery)}>
      <PageTitle className={s.title} title={t.title} />
      <ControlledTextField
        autoComplete={"email"}
        control={control}
        errorMessage={errors.email?.message}
        label={t.email}
        name={"email"}
        placeholder={"example@example.com"}
        type={"email"}
      />
      <Typography className={s.text} variant={"regular_text-14"}>
        {t.text}
      </Typography>
      {isSuccess && (
        <Typography className={s.hidden} variant={"regular_text-14"}>
          {t.hidden}
        </Typography>
      )}
      <Button disabled={!isValid || !isChecked} fullWidth type={"submit"}>
        {isSuccess ? t.send2 : t.send}
      </Button>
      <Link className={s.button} href={Paths.LOGIN}>
        <Typography variant={"h3"}>{t.back}</Typography>
      </Link>
      {!isSuccess && !errors.email && (
        <ReCAPTCHAWidget onChange={handleRecaptchaChange} />
      )}
    </Card>
  );
};
