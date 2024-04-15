import { SubmitHandler, useForm } from "react-hook-form";

import { GitHubBig, Google } from "@/public";
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

type SignInData = {
  email: string;
  password: string;
};

export const SignInCard = () => {
  const { t } = useTranslation();
  const { forgotPassword, password, question, signUp, title } = t.signIn;
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInData>();

  const onSubmit: SubmitHandler<SignInData> = (data) => {
    console.log(data);
  };

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
          control={control}
          errorMessage={errors.email?.message}
          label={"Email"}
          name={"email"}
          placeholder={"Email"}
          type={"email"}
          autoComplete={"email"}
        />
        <ControlledTextField
          className={s.lastInput}
          control={control}
          errorMessage={errors.password?.message}
          label={password}
          name={"password"}
          placeholder={password}
          type={"password"}
          autoComplete={"current-password"}
        />
      </>

      <Link className={s.link} href={"/sign-up"}>
        <Typography className={forgotPasswordCN} variant={"regular_text-14"}>
          {forgotPassword}
        </Typography>
      </Link>
      <Button className={s.button} fullWidth type={"submit"}>
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
