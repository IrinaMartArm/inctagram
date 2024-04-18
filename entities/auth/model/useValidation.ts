import { useForm } from "react-hook-form";

import { PASSWORD_REGEX } from "@/entities";
import { LoginArgs } from "@/shared/assets/api/auth/types";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const useLoginValidation = () => {
  const { t } = useTranslation();
  const { email, invalidPassword, passwordMax, passwordMin, required } =
    t.signIn.errors;

  const emailValidation = z.string().min(1, required).trim().email(email);

  const passwordValidation = z
    .string()
    .min(1, required)
    .min(6, passwordMin)
    .max(20, passwordMax)
    .regex(
      PASSWORD_REGEX,
      `${invalidPassword} 0-9, a-z, A-Z, ! " # $ % &
` + "' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~",
    );

  const loginSchema = z.object({
    email: emailValidation,
    password: passwordValidation,
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginArgs>({
    defaultValues,
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
