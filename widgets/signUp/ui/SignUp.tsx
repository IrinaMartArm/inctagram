import { toast } from "react-toastify";

import { GitHubBig, Google } from "@/public";
import { useSignUpMutation } from "@/shared/assets/api/auth/auth-api";
import { SignUpArgs } from "@/shared/assets/api/auth/types";
import { handleErrorResponse } from "@/shared/assets/helpers/handleErrorResponse";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import {
  Button,
  ControlledCheckBox,
  ControlledTextField,
  Typography,
} from "@/shared/components";
import { Card } from "@/shared/components/card";
import { Trans } from "@/shared/components/trans/Trans";
import {
  signUpFormFields,
  useSignUpForm,
} from "@/widgets/signUp/hooks/useSignUpForm";
import Link from "next/link";

import s from "./signUp.module.scss";

export const SignUpCard = () => {
  const { t } = useTranslation();
  const [signUp, { isLoading }] = useSignUpMutation();
  const {
    control,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    setError,
  } = useSignUpForm();

  const signUpHandler = (data: SignUpArgs) => {
    console.log(data);
    const signUpArgs = {
      email: data.email,
      password: data.password,
      username: data.username,
    };

    signUp(signUpArgs)
      .then((res) => {
        if ("error" in res) {
          return handleErrorResponse(res.error);
        } else {
          toast.success("The account has been created.");
        }
      })
      .then((error) => {
        if (error && error.fieldErrors) {
          error.fieldErrors?.forEach((el) => {
            setError(el.field as keyof signUpFormFields, {
              message: el.message,
            });
          });
        }
      });
  };

  return (
    <Card as={"form"} onSubmit={handleSubmit(signUpHandler)}>
      <Typography variant={"h1"}>{t.signup.title}</Typography>
      <div className={s.socials}>
        <Button icon={<Google />} variant={"link"} />
        <Button icon={<GitHubBig />} variant={"link"} />
      </div>
      <ControlledTextField
        control={control}
        disabled={isLoading}
        errorMessage={errors.email?.message}
        label={"Username"}
        name={"username"}
        placeholder={"Username"}
        type={"text"}
      />
      <ControlledTextField
        control={control}
        disabled={isLoading}
        errorMessage={errors.email?.message}
        label={"Email"}
        name={"email"}
        placeholder={"Email"}
        type={"email"}
      />
      <ControlledTextField
        control={control}
        disabled={isLoading}
        errorMessage={errors.email?.message}
        label={"Password"}
        name={"password"}
        placeholder={"Password"}
        type={"password"}
      />
      <ControlledTextField
        control={control}
        disabled={isLoading}
        errorMessage={errors.email?.message}
        label={"Password confirmation"}
        name={"confirm"}
        placeholder={"Password confirmation"}
        type={"password"}
      />
      <div className={s.policy}>
        <ControlledCheckBox
          control={control}
          disabled={isLoading}
          errorMessage={errors.email?.message}
          name={"agree"}
        />
        <div className={s.trans}>
          <Trans
            tags={{
              1: () => (
                <Link href={"./terms-of-service"}>
                  <Typography variant={"small_link"}>
                    {t.signup["1"]}
                  </Typography>
                </Link>
              ),
              2: () => (
                <Link href={"./privacy-policy"}>
                  <Typography variant={"small_link"}>
                    {t.signup["2"]}
                  </Typography>
                </Link>
              ),
            }}
            text={t.signup.agree}
          />
        </div>
      </div>
      <Button className={s.button} disabled={!isDirty || !isValid} fullWidth>
        {t.signup.title}
      </Button>
      <Typography variant={"regular_text-16"}>{t.signup.question}</Typography>
      <Button className={s.signupBtn} variant={"link"}>
        {t.signup.signIn}
      </Button>
    </Card>
  );
};
