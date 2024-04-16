import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useSignUpMutation } from "@/shared/assets/api/auth/auth-api";
import { SignUpArgs } from "@/shared/assets/api/auth/types";
import { handleErrorResponse } from "@/shared/assets/helpers/handleErrorResponse";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signUpSchema = z
  .object({
    agree: z.boolean(),
    confirm: z.string().min(6).max(20).trim(),
    email: z
      .string()
      .email("The email must match the format\n" + "example@example.com")
      .trim(),
    password: z
      .string()
      .min(6, "Minimum number of characters 6")
      .max(20, "Maximum number of characters 20")
      .trim(),
    username: z
      .string()
      .min(6, "Minimum number of characters 6")
      .max(30, "Maximum number of characters 30")
      .trim(),
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
export const defaultValues = {
  agree: false,
  confirm: "",
  email: "",
  password: "",
  username: "",
};

export const useSignUp = () => {
  const { t } = useTranslation();

  const [signUp, { isLoading }] = useSignUpMutation();
  const {
    control,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    reset,
    setError,
  } = useForm<signUpFormFields>({
    defaultValues,
    mode: "onTouched",
    resolver: zodResolver(signUpSchema),
  });

  const signUpHandler = (data: SignUpArgs) => {
    const signUpArgs = {
      email: data.email,
      password: data.password,
      username: data.username,
    };

    signUp(signUpArgs)
      .then((res) => {
        if ("error" in res) {
          return handleErrorResponse(res.error);
        } else {
          toast.success("The account has been created.");
        }
      })
      .then((error) => {
        if (error && error.fieldErrors) {
          error.fieldErrors?.forEach((el) => {
            setError(el.field as keyof signUpFormFields, {
              message: el.message,
            });
          });
        }
      });
    reset(defaultValues);
  };

  return {
    control,
    errors,
    handleSubmit,
    isDirty,
    isLoading,
    isValid,
    signUpHandler,
    t,
  };
};
