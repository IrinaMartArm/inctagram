import { PASSWORD_REGEX } from "@/entities";
import { USERNAME_REGEX } from "@/entities/auth/model/auth-validation";
import { LocaleType } from "@/locales/ru";
import { z } from "zod";

export const signUpSchema = (t: LocaleType) => {
  const {
    checkbox,
    confirm,
    formEmail,
    invalidPassword,
    invalidUsername,
    passwordMax,
    passwordMin,
    username,
  } = t.signUp;

  return z
    .object({
      agree: z.boolean(),
      confirm: z.string().trim().min(6, t.signUp.confirm).max(20, confirm),
      email: z.string().trim().email(formEmail),
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
};

export type SignUpFormFields = z.infer<ReturnType<typeof signUpSchema>>;
