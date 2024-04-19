import ReCAPTCHAWidget from "@/pages/password-recovery/recaptcha";
import {
  Button,
  Card,
  ControlledTextField,
  Typography,
} from "@/shared/components";
import { usePasswordRecovery } from "@/widgets/passwordRecovery/hook/usePasswordRecovery";
import Link from "next/link";

import s from "./passwordRecovery.module.scss";

export const PasswordRecovery = () => {
  const {
    control,
    errors,
    expired,
    handleRecaptchaChange,
    handleSubmit,
    isLoading,
    isSuccess,
    isValid,
    onRecovery,
    t,
    token,
  } = usePasswordRecovery();

  return (
    <Card as={"form"} onSubmit={handleSubmit(onRecovery)}>
      <Typography className={s.title} variant={"h1"}>
        {t.passwordRecovery.title}
      </Typography>
      <ControlledTextField
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
      <Button disabled={!isValid} fullWidth>
        {t.passwordRecovery.send}
      </Button>

      <Button
        as={Link}
        className={s.button}
        href={"./sign-in"}
        variant={"link"}
      >
        {t.passwordRecovery.back}
      </Button>
      {!isSuccess && <ReCAPTCHAWidget onChange={handleRecaptchaChange} />}
    </Card>
  );
};
{
  /*<div className={clsx(s.rootRecaptcha, error && s.error)}>*/
}
{
  /*    <div className={s.container}>*/
}
{
  /*        <div className={s.wrapper}>*/
}
{
  /*            <div className={s.expired}>*/
}
{
  /*                {expired && (*/
}
{
  /*                    <Typography variant={"error"}>*/
}
{
  /*                        {t.recaptcha.expired}*/
}
{
  /*                    </Typography>*/
}
{
  /*                )}*/
}
{
  /*            </div>*/
}
{
  /*            <div className={s.box}>*/
}
{
  /*                {isLoading ? (*/
}
{
  /*                    <Loader />*/
}
{
  /*                ) : (*/
}
{
  /*                    <ControlledCheckBox*/
}
{
  /*                        control={control}*/
}
{
  /*                        label={t.recaptcha.title}*/
}
{
  /*                        name={"recaptcha"}*/
}
{
  /*                        recaptcha*/
}
{
  /*                    />*/
}
{
  /*                )}*/
}
{
  /*            </div>*/
}
{
  /*            <Recaptcha />*/
}
{
  /*        </div>*/
}
{
  /*    </div>*/
}
{
  /*    {error && <Typography variant={"error"}>hi</Typography>}*/
}
{
  /*</div>*/
}
