import { z } from "zod";

export const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\]\\^_`{|}~])[0-9A-Za-z!"#$%&'()*+,\-./:;<=>?@[\]\\^_`{|}~]*$/;

export const emailValidation = z
  .string()
  .trim()
  .min(1, "Required")
  .email("The email must match the format example@example.com");

export const passwordValidation = z
  .string()
  .regex(
    PASSWORD_REGEX,
    'Password must contain 0-9, a-z, A-Z, ! " # $ % &\n' +
      "' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~",
  )
  .min(6, "Minimum number of characters 6")
  .max(20, "Maximum number of characters 30");

export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});
