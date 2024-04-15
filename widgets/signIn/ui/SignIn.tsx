import { SubmitHandler, useForm } from "react-hook-form";

import { GitHubBig, Google } from "@/public";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import {
  Button,
  Card,
  ControlledTextField,
  Typography,
} from "@/shared/components";
import Link from "next/link";

import s from "./signIn.module.scss";

type SignInData = {
  email: string;
  password: string;
};

export const SignInCard = () => {
  const { t } = useTranslation();
  const { forgotPassword, password, question, signUp, title } = t.signIn;
  const { control, handleSubmit, register } = useForm<SignInData>();

  const onSubmit: SubmitHandler<SignInData> = (data) => {
    console.log(data);
  };

  return (
    <Card as={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Typography as={"h1"} className={s.title} variant={"h1"}>
        {title}
      </Typography>
      <div className={s.socials}>
        <Google />
        <GitHubBig />
      </div>
      <ControlledTextField
        control={control}
        {...register("email")}
        label={"Email"}
        placeholder={"Email"}
        type={"email"}
      />
      <ControlledTextField
        control={control}
        {...register("password")}
        label={password}
        placeholder={password}
        type={"password"}
      />

      <Link className={s.link} href={"./sign-up"}>
        <Typography className={s.forgotPassword} variant={"regular_text-14"}>
          {forgotPassword}
        </Typography>
      </Link>
      <Button fullWidth type={"submit"}>
        {title}
      </Button>
      <Typography className={s.question} variant={"regular_text-16"}>
        {question}
      </Typography>
      <Button as={"a"} fullWidth type={"button"} variant={"link"}>
        {signUp}
      </Button>
    </Card>
  );
};
