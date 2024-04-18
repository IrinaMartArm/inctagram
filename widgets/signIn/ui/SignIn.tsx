import { SubmitHandler, useForm } from "react-hook-form";

import { GitHubBig, Google } from "@/public";
import { useAppSelector } from "@/shared/assets/api/store";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import {
  Button,
  Card,
  ControlledTextField,
  Typography,
} from "@/shared/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { clsx } from "clsx";
import Link from "next/link";
import { z } from "zod";

import s from "./signIn.module.scss";

export const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\]\\^_`{|}~])[0-9A-Za-z!"#$%&'()*+,\-./:;<=>?@[\]\\^_`{|}~]*$/;

export const emailValidation = z
  .string()
  .trim()
  .min(1, "Required")
  .email("The email must match the format example@example.com");
export const passwordValidation = z
  .string()
  .regex(
    PASSWORD_REGEX,
    'Password must contain 0-9, a-z, A-Z, ! " # $ % &\n' +
      "' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~",
  )
  .min(6, "Minimum number of characters 6")
  .max(20, "Maximum number of characters 30");

export const signInSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

type SignInData = {
  email: string;
  password: string;
};

type Props = {
  onSubmit: SubmitHandler<SignInData>;
};

export const SignInCard = ({ onSubmit }: Props) => {
  const { t } = useTranslation();
  const { forgotPassword, password, question, signUp, title } = t.signIn;
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SignInData>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

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
