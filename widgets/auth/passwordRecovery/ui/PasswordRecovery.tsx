import ReCAPTCHAWidget from "@/pages/auth/password-recovery/recaptcha";
import { Paths } from "@/shared/assets/paths";
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
      <PageTitle className={s.title} title={t.passwordRecovery.title} />
      <ControlledTextField
        autoComplete={"email"}
        control={control}
        errorMessage={errors.email?.message}
        label={"Email"}
        name={"email"}
        placeholder={"example@example.com"}
        type={"email"}
      />
      <Typography className={s.text} variant={"regular_text-14"}>
        {t.passwordRecovery.text}
      </Typography>
      {isSuccess && (
        <Typography className={s.hidden} variant={"regular_text-14"}>
          {t.passwordRecovery.hidden}
        </Typography>
      )}
      <Button disabled={!isValid || !isChecked} fullWidth type={"submit"}>
        {isSuccess ? t.passwordRecovery.send2 : t.passwordRecovery.send}
      </Button>
      <Button
        as={Link}
        className={s.button}
        href={Paths.LOGIN}
        variant={"link"}
      >
        {t.passwordRecovery.back}
      </Button>
      {!isSuccess && <ReCAPTCHAWidget onChange={handleRecaptchaChange} />}
    </Card>
  );
};
