import { useForm } from "react-hook-form";

import { PASSWORD_REGEX } from "@/entities";
import { LoginArgs } from "@/shared/assets/api/auth/types";
import { useTranslationPages } from "@/shared/assets/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const useLoginValidation = () => {
  const { t } = useTranslationPages();

  const emailValidation = z.string().min(1, t.required).trim().email(t.email);

  const passwordValidation = z
    .string()
    .min(1, t.required)
    .min(6, t.passwordMin)
    .max(20, t.passwordMax)
    .regex(
      PASSWORD_REGEX,
      `${t.invalidPassword} 0-9, a-z, A-Z, ! " # $ % &
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
