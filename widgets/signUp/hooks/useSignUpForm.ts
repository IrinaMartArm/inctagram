import { useState } from "react";
import { useForm } from "react-hook-form";

import { PASSWORD_REGEX } from "@/entities";
import { USERNAME_REGEX } from "@/entities/auth/model/auth-validation";
import { useSignUpMutation } from "@/shared/assets/api/auth/auth-api";
import { SignUpArgs } from "@/shared/assets/api/auth/types";
import {
  handleErrorResponse,
  validationError,
} from "@/shared/assets/helpers/handleErrorResponse";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const useSignUp = () => {
  const { t } = useTranslation();
  const {
    checkbox,
    confirm,
    emailMin,
    formEmail,
    invalidPassword,
    invalidUsername,
    passwordMax,
    passwordMin,
    username,
  } = t.signUp;

  const signUpSchema = z
    .object({
      agree: z.boolean(),
      confirm: z.string().trim().min(6, confirm).max(20, confirm),
      email: z.string().trim().min(1, emailMin).email(formEmail),
      password: z
        .string()
        .trim()
        .min(6, passwordMin)
        .max(20, passwordMax)
        .regex(
          PASSWORD_REGEX,
          `${invalidPassword} 0-9, a-z, A-Z, ! " # $ % &
           ` + "' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~",
        ),
      username: z
        .string()
        .trim()
        .min(6, passwordMin)
        .max(30, username)
        .regex(USERNAME_REGEX, `${invalidUsername} a-zA-Z0-9_-`),
    })
    .refine((value) => value.agree, {
      message: checkbox,
      path: ["agree"],
    })
    .refine((data) => data.password === data.confirm, {
      message: confirm,
      path: ["confirm"],
    });

  type SignUpFormFields = z.infer<typeof signUpSchema>;

  const defaultValues = {
    agree: false,
    confirm: "",
    email: "",
    password: "",
    username: "",
  };

  const [open, setOpen] = useState(false);
  const [signUp, { isLoading }] = useSignUpMutation();
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setError,
  } = useForm<SignUpFormFields>({
    defaultValues,
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });
  const signUpHandler = async (data: SignUpArgs) => {
    const signUpArgs = {
      email: data.email,
      password: data.password,
      username: data.username,
    };

    localStorage.setItem("email", data.email);
    localStorage.setItem("username", data.username);

    try {
      await signUp(signUpArgs).unwrap();

      setOpen(true);
    } catch (err: any) {
      const result = validationError(err);

      if (result) {
        result.errorsMessages.forEach((el) => {
          setError(el.field as keyof SignUpArgs, { message: el.message });
        });
      }
      handleErrorResponse(err);
    }
    reset(defaultValues);
  };

  const onOpenChangeHandler = () => {
    setOpen(false);
  };

  let email;

  if (typeof window !== "undefined") {
    email = localStorage.getItem("email");
  }

  return {
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
  };
};
