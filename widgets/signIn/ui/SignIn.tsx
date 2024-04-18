import { SubmitHandler } from "react-hook-form";

import { useLoginValidation } from "@/entities";
import { GitHubBig, Google } from "@/public";
import { LoginArgs } from "@/shared/assets/api/auth/types";
import { useAppSelector } from "@/shared/assets/api/store";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import {
  Button,
  Card,
  ControlledTextField,
  Typography,
} from "@/shared/components";
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
    <Card as={"form"} className={s.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <Typography as={"h1"} className={s.title} variant={"h1"}>
        {title}
      </Typography>
      <div className={s.socials}>
        <Link aria-label={"sign in with Google"} href={""}>
          <Google />
        </Link>
        <Link aria-label={"sign in with GitHub"} href={""}>
          <GitHubBig />
        </Link>
      </div>
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

      <Link className={s.link} href={"/sign-up"}>
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
      <Link href={""}>
        <Typography className={s.question} variant={"regular_text-16"}>
          {question}
        </Typography>
      </Link>
      <Link href={"/sign-up"}>
        <Typography className={s.signUp} variant={"h3"}>
          {signUp}
        </Typography>
      </Link>
    </Card>
  );
};
