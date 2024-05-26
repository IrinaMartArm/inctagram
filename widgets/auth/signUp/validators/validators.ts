import { PASSWORD_REGEX } from "@/entities";
import { USERNAME_REGEX } from "@/entities/auth/model/auth-validation";
import { SignUpLocale } from "@/locales/sign-up/ru";
import { z } from "zod";

export const signUpSchema = (t: SignUpLocale) => {
  return z
    .object({
      agree: z.boolean(),
      confirm: z.string().trim().min(6, t.passwordMin).max(20, t.passwordMax),
      email: z.string().trim().email(t.formEmail),
      password: z
        .string()
        .trim()
        .min(6, t.passwordMin)
        .max(20, t.passwordMax)
        .regex(
          PASSWORD_REGEX,
          `${t.invalidPassword} 0-9, a-z, A-Z, ! " # $ % &
           ` + "' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~",
        ),
      username: z
        .string()
        .trim()
        .min(6, t.passwordMin)
        .max(30, t.usernameError)
        .regex(USERNAME_REGEX, `${t.invalidUsername} a-zA-Z0-9_-`),
    })
    .refine((value) => value.agree, {
      message: t.checkbox,
      path: ["agree"],
    })
    .refine((data) => data.password === data.confirm, {
      message: t.confirm,
      path: ["confirm"],
    });
};

export type SignUpFormFields = z.infer<ReturnType<typeof signUpSchema>>;
