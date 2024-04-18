import {
  Button,
  Card,
  ControlledTextField,
  Loader,
  Typography,
} from "@/shared/components";
import { useNewPassword } from "@/widgets/newPassword/hook/useNewPassword";

import s from "./newPassword.module.scss";

export const NewPasswordCard = () => {
  const { control, handleSubmit, isLoading, newPasswordCreator, t } =
    useNewPassword();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Card as={"form"} onSubmit={handleSubmit(newPasswordCreator)}>
      <Typography className={s.title} variant={"h1"}>
        {t.passwordRecovery.createTitle}
      </Typography>
      <ControlledTextField
        control={control}
        label={"New password"}
        name={"password"}
        placeholder={"New password"}
        type={"password"}
      />
      <ControlledTextField
        control={control}
        label={"Password confirmation"}
        name={"passwordConfirmation"}
        placeholder={"Password confirmation"}
        type={"password"}
      />
      <Typography className={s.text} variant={"regular_text-14"}>
        {t.passwordRecovery.rules}
      </Typography>
      <Button fullWidth>{t.passwordRecovery.send}</Button>
    </Card>
  );
};
