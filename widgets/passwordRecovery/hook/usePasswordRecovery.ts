import { useState } from "react";
import { useForm } from "react-hook-form";

import { useEmailResendingMutation } from "@/shared/assets/api/auth/auth-api";
import { EmailResendingArgs } from "@/shared/assets/api/auth/types";
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
      email: z.string().email(),
      recaptcha: z.boolean(),
    })
    .refine((value) => value.recaptcha === true, {
      message: t.recaptcha.text,
      path: ["recaptcha"],
    })
    .refine((value) => value.email === email, {
      message: "User with this email doesn't exist",
      path: ["email"],
    });

  type PasswordRecoverySchema = z.infer<typeof passwordRecoverySchema>;

  const [show, setShow] = useState(false);
  const [emailResending, { error, isLoading, reset }] =
    useEmailResendingMutation();
  const {
    control,
    formState: { isDirty, isValid },
    handleSubmit,
  } = useForm<PasswordRecoverySchema>({
    resolver: zodResolver(passwordRecoverySchema),
  });
  const expired = false;
  const onRecovery = (data: EmailResendingArgs) => {
    if (data.email === email) {
      emailResending(data);
    }
    reset();
    setShow(!show);
  };

  return {
    control,
    error,
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
