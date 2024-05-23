import { SubmitHandler } from "react-hook-form";

import { useLoginValidation } from "@/entities";
import { Paths } from "@/shared/assets";
import { LoginArgs } from "@/shared/assets/api/auth/types";
import { useAppSelector } from "@/shared/assets/api/store";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import {
  Button,
  Card,
  ControlledTextField,
  PageTitle,
  Typography,
} from "@/shared/components";
import { AuthWithSocial } from "@/widgets";
import { clsx } from "clsx";
import Link from "next/link";

import s from "./signIn.module.scss";

type Props = {
  onSubmit: SubmitHandler<LoginArgs>;
};

export const SignInCard = ({ onSubmit }: Props) => {
  const { t } = useTranslation();
  const { forgotPassword, password, question, signUp, title } = t.signIn;

  const { control, errors, handleSubmit, isValid } = useLoginValidation();

  const error = useAppSelector((state) => state.auth.error);

  const forgotPasswordCN = clsx(
    s.forgotPassword,
    errors.password?.message && s.withError,
  );

  return (
    <Card as={"form"} onSubmit={handleSubmit(onSubmit)}>
      <PageTitle title={title} />
      <AuthWithSocial />
      <>
        <ControlledTextField
          autoComplete={"email"}
          control={control}
          errorMessage={errors.email?.message}
          label={"Email"}
          name={"email"}
          placeholder={"Email"}
          type={"email"}
        />
        <ControlledTextField
          autoComplete={"current-password"}
          className={s.lastInput}
          control={control}
          errorMessage={errors.password?.message || error}
          label={password}
          name={"password"}
          placeholder={password}
          type={"password"}
        />
      </>

      <Link className={s.link} href={Paths.RECOVERY_PASSWORD}>
        <Typography className={forgotPasswordCN} variant={"regular_text-14"}>
          {forgotPassword}
        </Typography>
      </Link>
      <Button
        className={s.button}
        disabled={!isValid}
        fullWidth
        type={"submit"}
      >
        {title}
      </Button>
      <Typography className={s.question} variant={"regular_text-16"}>
        {question}
      </Typography>
      <Link className={s.signUp} href={Paths.REGISTRATION}>
        <Typography className={s.signUpLink} variant={"h3"}>
          {signUp}
        </Typography>
      </Link>
    </Card>
  );
};
