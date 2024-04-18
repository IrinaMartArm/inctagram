import { useForm } from "react-hook-form";

import { PASSWORD_REGEX } from "@/entities/auth/model/auth-validation";
import { LoginArgs } from "@/shared/assets/api/types";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const useLoginValidation = () => {
  const { t } = useTranslation();
  const { email, invalidPassword, passwordMax, passwordMin, required } =
    t.signIn.errors;

  const emailValidation = z.string().trim().min(1, required).email(email);

  const passwordValidation = z
    .string()
    .regex(
      PASSWORD_REGEX,
      `${invalidPassword} 0-9, a-z, A-Z, ! " # $ % &
` + "' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~",
    )
    .min(6, passwordMin)
    .max(20, passwordMax);

  const loginSchema = z.object({
    email: emailValidation,
    password: passwordValidation,
  });

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginArgs>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  return {
    control,
    errors,
    handleSubmit,
    isValid,
    t,
  };
};
