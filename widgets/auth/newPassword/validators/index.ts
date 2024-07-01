import { PASSWORD_REGEX } from '@/entities'
import { SignUpLocale } from '@/locales/sign-up/ru'
import z from 'zod'

export const newPasswordSchema = (t: SignUpLocale) => {
  return z
    .object({
      newPassword: z
        .string()
        .min(6, t.passwordMin)
        .max(20, t.passwordMax)
        .trim()
        .regex(
          PASSWORD_REGEX,
          `${t.invalidPassword} 0-9, a-z, A-Z, ! " # $ % &
           ` + "' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~"
        ),
      passwordConfirmation: z.string().min(6, t.confirm).max(20, t.confirm).trim(),
    })
    .refine(value => value.newPassword === value.passwordConfirmation, {
      message: t.confirm,
      path: ['passwordConfirmation'],
    })
}

export type NewPasswordFormFields = z.infer<ReturnType<typeof newPasswordSchema>>
