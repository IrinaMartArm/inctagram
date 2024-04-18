import { useState } from "react";
import { useForm } from "react-hook-form";

import { useEmailResendingMutation } from "@/shared/assets/api/auth/auth-api";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const usePasswordRecovery = () => {
  const { t } = useTranslation();

  let email: string = "";

  if (typeof window !== "undefined") {
    email = localStorage.getItem("email") || "";
  }

  const passwordRecoverySchema = z
    .object({
      email: z.string().email().trim(),
      recaptcha: z.boolean(),
    })
    .refine((value) => value.recaptcha, {
      message: t.recaptcha.text,
      path: ["recaptcha"],
    })
    .refine((value) => value.email === email, {
      message: "User with this email doesn't exist",
      path: ["email"],
    });

  type PasswordRecoveryFormFields = z.infer<typeof passwordRecoverySchema>;

  const defaultValues = {
    email: "",
    recaptcha: false,
  };

  const [show, setShow] = useState(false);
  const [emailResending, { error, isLoading }] = useEmailResendingMutation();
  const {
    control,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    reset,
  } = useForm<PasswordRecoveryFormFields>({
    defaultValues,
    mode: "onTouched",
    resolver: zodResolver(passwordRecoverySchema),
  });
  const expired = false;
  const onRecovery = (data: PasswordRecoveryFormFields) => {
    if (data.email === email) {
      emailResending(data);
    }
    reset(defaultValues);
    setShow(!show);
  };

  return {
    control,
    error,
    errors,
    expired,
    handleSubmit,
    isDirty,
    isLoading,
    isValid,
    onRecovery,
    show,
    t,
  };
};
