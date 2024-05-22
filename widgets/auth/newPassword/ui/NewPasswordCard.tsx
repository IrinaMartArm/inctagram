import {
  Button,
  Card,
  ControlledTextField,
  Loader,
  PageTitle,
  Typography,
} from "@/shared/components";
import { useNewPassword } from "@/widgets/auth/newPassword/hook/useNewPassword";

import s from "./newPassword.module.scss";

export const NewPasswordCard = () => {
  const { control, errors, handleSubmit, isLoading, newPasswordCreator, t } =
    useNewPassword();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Card as={"form"} onSubmit={handleSubmit(newPasswordCreator)}>
      <PageTitle className={s.title} title={t.passwordRecovery.createTitle} />

      <ControlledTextField
        control={control}
        errorMessage={errors.newPassword?.message}
        label={"New password"}
        name={"newPassword"}
        placeholder={"New password"}
        type={"password"}
      />
      <ControlledTextField
        control={control}
        errorMessage={errors.passwordConfirmation?.message}
        label={"Password confirmation"}
        name={"passwordConfirmation"}
        placeholder={"Password confirmation"}
        type={"password"}
      />
      <Typography className={s.text} variant={"regular_text-14"}>
        {t.passwordRecovery.rules}
      </Typography>
      <Button fullWidth type={"submit"}>
        {t.passwordRecovery.createTitle}
      </Button>
    </Card>
  );
};
