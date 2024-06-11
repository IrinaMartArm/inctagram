import {
  ComponentPropsWithoutRef,
  Ref,
  forwardRef,
  useImperativeHandle,
} from "react";

import { Paths } from "@/shared/assets";
import { useFormRevalidate } from "@/shared/assets/hooks/useFormRevalidate";
import { UseFormRef } from "@/shared/assets/types/form";
import {
  Button,
  Card,
  ControlledCheckBox,
  ControlledTextField,
  Loader,
  PageTitle,
  Trans,
  Typography,
} from "@/shared/components";
import { AuthWithSocial } from "@/widgets";
import { useSignUp } from "@/widgets/auth/signUp/hooks/useSignUpForm";
import { SignUpFormFields } from "@/widgets/auth/signUp/validators/validators";
import Link from "next/link";

import s from "./signUp.module.scss";

type SignUpCardProps = {
  isLoading: boolean;
  onSubmit: (data: SignUpFormFields) => void;
} & Omit<ComponentPropsWithoutRef<"form">, "onSubmit">;

export const SignUpCard = forwardRef(
  (props: SignUpCardProps, ref: Ref<UseFormRef<SignUpFormFields>>) => {
    const { isLoading, onSubmit } = props;
    const {
      control,
      errors,
      getValues,
      handleSubmit,
      isValid,
      locale,
      reset,
      setError,
      setValue,
      t,
    } = useSignUp();

    useImperativeHandle(ref, () => ({ reset, setError }));

    useFormRevalidate({
      errors,
      locale,
      setValue,
      values: getValues(),
    });

    if (isLoading) {
      return <Loader />;
    }

    return (
      <Card as={"form"} onSubmit={handleSubmit(onSubmit)}>
        <PageTitle title={t.title} />
        <AuthWithSocial />
        <ControlledTextField
          control={control}
          disabled={isLoading}
          errorMessage={errors.username?.message}
          label={t.name}
          name={"username"}
          placeholder={t.name}
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
          errorMessage={errors.password?.message}
          label={t.password}
          name={"password"}
          placeholder={t.password}
          type={"password"}
        />
        <ControlledTextField
          control={control}
          disabled={isLoading}
          errorMessage={errors.confirm?.message}
          label={t.passwordConfirmation}
          name={"confirm"}
          placeholder={t.passwordConfirmation}
          type={"password"}
        />
        <div className={s.policy}>
          <ControlledCheckBox
            control={control}
            disabled={isLoading}
            errorMessage={errors.agree?.message}
            name={"agree"}
          />
          <div className={s.trans}>
            <Trans
              tags={{
                1: () => (
                  <Link href={Paths.SERVICE}>
                    <Typography variant={"small_link"}>{t["1"]}</Typography>
                  </Link>
                ),
                2: () => (
                  <Link href={Paths.POLICY}>
                    <Typography variant={"small_link"}>{t["2"]}</Typography>
                  </Link>
                ),
              }}
              text={t.agree}
            />
          </div>
        </div>
        <Button
          className={s.button}
          disabled={!isValid}
          fullWidth
          type={"submit"}
        >
          {t.title}
        </Button>

        <Typography variant={"regular_text-16"}>{t.question}</Typography>
        <Link className={s.signIn} href={Paths.LOGIN}>
          <Typography className={s.signInLink} variant={"h3"}>
            {t.signIn}
          </Typography>
        </Link>
      </Card>
    );
  },
);
