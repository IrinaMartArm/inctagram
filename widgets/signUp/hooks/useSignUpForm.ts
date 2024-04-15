import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signUpSchema = z
  .object({
    agree: z.boolean(),
    confirm: z.string().min(6).max(20).trim(),
    email: z.string().email("Enter valid email").trim(),
    password: z.string().min(6).max(20).trim(),
    username: z.string().min(6, { message: "Name is required" }).max(30).trim(),
  })
  .refine((value) => value.agree === true, {
    message: "Необходимо согласиться с условиями",
    path: ["agree"],
  })
  .refine((data) => data.password === data.confirm, {
    message: "Пароль и подтверждение пароля должны совпадать",
    path: ["confirm"],
  });

export type signUpFormFields = z.infer<typeof signUpSchema>;

export const useSignUpForm = () =>
  useForm<signUpFormFields>({
    defaultValues: {
      agree: false,
      confirm: "",
      email: "",
      password: "",
      username: "",
    },
    mode: "onTouched",
    resolver: zodResolver(signUpSchema),
  });
