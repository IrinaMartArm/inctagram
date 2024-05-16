import { Paths } from "@/shared/assets/paths";
import {
  Button,
  Card,
  ControlledCheckBox,
  ControlledTextField,
  Loader,
  Modal,
  PageTitle,
  Trans,
  Typography,
} from "@/shared/components";
import { AuthWithSocial } from "@/widgets";
import { useSignUp } from "@/widgets/signUp/hooks/useSignUpForm";
import { EmailSent } from "@/widgets/signUp/ui/EmailSent";
import Link from "next/link";

import s from "./signUp.module.scss";

export const SignUpCard = () => {
  const {
    control,
    email,
    errors,
    handleSubmit,
    isLoading,
    isValid,
    onOpenChangeHandler,
    open,
    signUpHandler,
    t,
  } = useSignUp();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Card as={"form"} onSubmit={handleSubmit(signUpHandler)}>
      <PageTitle title={t.signUp.title} />
      <AuthWithSocial />
      <ControlledTextField
        control={control}
        disabled={isLoading}
        errorMessage={errors.username?.message}
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
        autoComplete={"off"}
        control={control}
        disabled={isLoading}
        errorMessage={errors.password?.message}
        label={"Password"}
        name={"password"}
        placeholder={"Password"}
        type={"password"}
      />
      <ControlledTextField
        autoComplete={"off"}
        className={errors.confirm?.message ? s.lastInput : ""}
        control={control}
        disabled={isLoading}
        errorMessage={errors.confirm?.message}
        label={"Password confirmation"}
        name={"confirm"}
        placeholder={"Password confirmation"}
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
                  <Typography variant={"small_link"}>
                    {t.signUp["1"]}
                  </Typography>
                </Link>
              ),
              2: () => (
                <Link href={Paths.POLICY}>
                  <Typography variant={"small_link"}>
                    {t.signUp["2"]}
                  </Typography>
                </Link>
              ),
            }}
            text={t.signUp.agree}
          />
        </div>
      </div>
      <Modal
        onOpenChange={onOpenChangeHandler}
        open={open}
        title={"Email sent"}
        trigger={
          <Button
            className={s.button}
            disabled={!isValid}
            fullWidth
            type={"submit"}
          >
            {t.signUp.title}
          </Button>
        }
      >
        <EmailSent email={email || ""} />
      </Modal>
      <Typography className={s.question} variant={"regular_text-16"}>
        {t.signUp.question}
      </Typography>
      <Button
        as={Link}
        className={s.signInBtn}
        href={Paths.LOGIN}
        variant={"link"}
      >
        {t.signUp.signIn}
      </Button>
    </Card>
  );
};
