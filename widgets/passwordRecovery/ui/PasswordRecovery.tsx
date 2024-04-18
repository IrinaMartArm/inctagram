import { Recaptcha } from "@/public";
import {
  Button,
  Card,
  ControlledCheckBox,
  ControlledTextField,
  Loader,
  Typography,
} from "@/shared/components";
import { usePasswordRecovery } from "@/widgets/passwordRecovery/hook/usePasswordRecovery";
import { clsx } from "clsx";
import Link from "next/link";

import s from "./passwordRecovery.module.scss";

export const PasswordRecovery = () => {
  const {
    control,
    error,
    expired,
    handleSubmit,
    isDirty,
    isLoading,
    isValid,
    onRecovery,
    show,
    t,
  } = usePasswordRecovery();

  return (
    <Card as={"form"} onSubmit={handleSubmit(onRecovery)}>
      <Typography className={s.title} variant={"h1"}>
        {t.passwordRecovery.title}
      </Typography>
      <ControlledTextField
        control={control}
        label={"Email"}
        name={"email"}
        placeholder={"example@example.com"}
        type={"email"}
      />
      <Typography className={s.text} variant={"regular_text-14"}>
        {t.passwordRecovery.text}
      </Typography>
      {show && (
        <Typography className={s.hidden} variant={"regular_text-14"}>
          {t.passwordRecovery.hidden}
        </Typography>
      )}
      <Button disabled={!isDirty || !isValid} fullWidth>
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
      {!show && (
        <div className={clsx(s.rootRecaptcha, error && s.error)}>
          <div className={s.container}>
            <div className={s.wrapper}>
              <div className={s.expired}>
                {expired && (
                  <Typography variant={"error"}>
                    {t.recaptcha.expired}
                  </Typography>
                )}
              </div>
              <div className={s.box}>
                {isLoading ? (
                  <Loader />
                ) : (
                  <ControlledCheckBox
                    control={control}
                    label={t.recaptcha.title}
                    name={"recaptcha"}
                    recaptcha
                  />
                )}
              </div>
              <Recaptcha />
            </div>
          </div>
          {error && <Typography variant={"error"}>hi</Typography>}
        </div>
      )}
    </Card>
  );
};
