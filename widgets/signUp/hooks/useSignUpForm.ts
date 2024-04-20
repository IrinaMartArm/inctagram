import { useForm } from "react-hook-form";

import { useSignUpMutation } from "@/shared/assets/api/auth/auth-api";
import { SignUpArgs } from "@/shared/assets/api/auth/types";
import { handleErrorResponse } from "@/shared/assets/helpers/handleErrorResponse";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const useSignUp = () => {
  const { t } = useTranslation();
  const { checkbox, confirm, formEmail, passwordMax, passwordMin, username } =
    t.signUp;

  const signUpSchema = z
    .object({
      agree: z.boolean(),
      confirm: z.string().min(6, confirm).max(20, confirm).trim(),
      email: z.string().min(1).email(formEmail).trim(),
      password: z.string().min(6, passwordMin).max(20, passwordMax).trim(),
      username: z.string().min(6, passwordMin).max(30, username).trim(),
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

  const [signUp, { isLoading }] = useSignUpMutation();
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<SignUpFormFields>({
    defaultValues,
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });
  const signUpHandler = (data: SignUpArgs) => {
    const signUpArgs = {
      email: data.email,
      password: data.password,
      username: data.username,
    };

    localStorage.setItem("email", data.email);

    try {
      signUp(signUpArgs).unwrap();
    } catch (err: any) {
      handleErrorResponse(err);
    }

    reset(defaultValues);
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
    signUpHandler,
    t,
  };
};
