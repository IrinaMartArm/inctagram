import { GitHubBig, Google } from "@/public";
import {
  Button,
  Card,
  ControlledCheckBox,
  ControlledTextField,
  Trans,
  Typography,
} from "@/shared/components";
import { Modal } from "@/shared/components/modals";
import { useSignUp } from "@/widgets/signUp/hooks/useSignUpForm";
import { EmailSent } from "@/widgets/signUp/ui/EmailSent";
import Link from "next/link";

import s from "./signUp.module.scss";

export const SignUpCard = () => {
  const {
    control,
    errors,
    handleSubmit,
    isDirty,
    isLoading,
    isValid,
    signUpHandler,
    t,
  } = useSignUp();

  const email = "test@test.com";

  return (
    <>
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
        <Modal
          title={"Email sent"}
          trigger={
            <Button
              className={s.button}
              disabled={!isDirty || !isValid}
              fullWidth
              type={"submit"}
            >
              {t.signup.title}
            </Button>
          }
        >
          <EmailSent email={email} />
        </Modal>
        <Typography variant={"regular_text-16"}>{t.signup.question}</Typography>
        <Button className={s.signupBtn} variant={"link"}>
          {t.signup.signIn}
        </Button>
      </Card>
    </>
  );
};
