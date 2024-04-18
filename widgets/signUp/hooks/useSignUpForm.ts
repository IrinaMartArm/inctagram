import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useSignUpMutation } from "@/shared/assets/api/auth/auth-api";
import { SignUpArgs } from "@/shared/assets/api/auth/types";
import { handleErrorResponse } from "@/shared/assets/helpers/handleErrorResponse";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const useSignUp = () => {
  const { t } = useTranslation();

  const signUpSchema = z
    .object({
      agree: z.boolean(),
      confirm: z
        .string()
        .min(6, { message: t.signup.confirm })
        .max(20, { message: t.signup.confirm })
        .trim(),
      email: z.string().email(t.signup.email).trim(),
      password: z
        .string()
        .min(6, { message: t.signup.passwordMin })
        .max(20, { message: t.signup.passwordMax })
        .trim(),
      username: z
        .string()
        .min(6, { message: t.signup.passwordMin })
        .max(30, { message: t.signup.username })
        .trim(),
    })
    .refine((value) => value.agree === true, {
      message: t.signup.checkbox,
      path: ["agree"],
    })
    .refine((data) => data.password === data.confirm, {
      message: t.signup.confirm,
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

  const [signUp, { isLoading }] = useSignUpMutation();
  const {
    control,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    reset,
    setError,
  } = useForm<SignUpFormFields>({
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
          toast.success(t.signup.created);
        }
      })
      .then((error) => {
        if (error && error.fieldErrors) {
          error.fieldErrors?.forEach((el) => {
            setError(el.field as keyof SignUpFormFields, {
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
