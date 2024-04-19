import { useState } from "react";
import { useForm } from "react-hook-form";

import { usePasswordRecoveryMutation } from "@/shared/assets/api/auth/auth-api";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { z } from "zod";

export const usePasswordRecovery = () => {
  const { t } = useTranslation();

  const passwordRecoverySchema = z.object({
    email: z.string().trim().email(),
    token: z.string(),
  });

  type PasswordRecoveryFormFields = z.infer<typeof passwordRecoverySchema>;

  const defaultValues = {
    email: "",
    token: "",
  };

  const [token, setToken] = useState<null | string>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [passwordRecovery, { error, isLoading }] =
    usePasswordRecoveryMutation();
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm<PasswordRecoveryFormFields>({
    defaultValues,
    mode: "onSubmit",
    // resolver: zodResolver(passwordRecoverySchema),
  });
  const expired = error;
  const onRecovery = async (data: PasswordRecoveryFormFields) => {
    if (token) {
      const body = { email: data.email, reCaptcha: token };

      await passwordRecovery(body)
        .then(() => setIsVerified(true))
        .catch(() => setIsVerified(false));
      reset(defaultValues);
    }
  };
  const handleRecaptchaChange = (token: any) => {
    setToken(token);
    setValue("token", token);
  };

  return {
    control,
    error,
    errors,
    expired,
    handleRecaptchaChange,
    handleSubmit,
    isLoading,
    isSuccess,
    isValid,
    isVerified,
    onRecovery,
    t,
    token,
  };
};
