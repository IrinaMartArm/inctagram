import { useForm } from "react-hook-form";

import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import {
  Button,
  Card,
  ControlledTextField,
  Typography,
} from "@/shared/components";
import { ReCaptcha } from "@/widgets";
import Link from "next/link";

import s from "./passwordRecovery.module.scss";

export const PasswordRecovery = () => {
  const { t } = useTranslation();
  const { control } = useForm();

  return (
    <Card as={"form"}>
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
      {
        <div className={s.hidden}>
          <Typography variant={"regular_text-14"}>
            {t.passwordRecovery.hidden}
          </Typography>
          <Typography variant={"regular_text-14"}>
            {t.passwordRecovery.hidden2}
          </Typography>
        </div>
      }
      <Button fullWidth>{t.passwordRecovery.send}</Button>
      <Button
        as={Link}
        className={s.button}
        href={"./sign-in"}
        variant={"link"}
      >
        {t.passwordRecovery.back}
      </Button>
      <ReCaptcha />
    </Card>
  );
};
