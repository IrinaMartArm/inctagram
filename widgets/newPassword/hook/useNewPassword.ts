import { useForm } from "react-hook-form";

import { useCreateNewPasswordMutation } from "@/shared/assets/api/auth/auth-api";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/router";
import z from "zod";

export const useNewPassword = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { confirm, passwordMax, passwordMin } = t.signUp;

  const code = Array.isArray(router.query.code)
    ? router.query.code[0]
    : router.query.code;

  const newPasswordSchema = z
    .object({
      newPassword: z.string().min(6, passwordMin).max(20, passwordMax).trim(),
      passwordConfirmation: z.string().min(6, confirm).max(20, confirm).trim(),
    })
    .refine((value) => value.newPassword === value.passwordConfirmation, {
      message: confirm,
      path: ["passwordConfirmation"],
    });

  type NewPasswordFormFields = z.infer<typeof newPasswordSchema>;

  const defaultValues = {
    newPassword: "",
    passwordConfirmation: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<NewPasswordFormFields>({
    defaultValues,
    mode: "onTouched",
    resolver: zodResolver(newPasswordSchema),
  });

  const [createNewPassword, { isLoading }] = useCreateNewPasswordMutation();

  const newPasswordCreator = async (data: NewPasswordFormFields) => {
    const args = {
      newPassword: data.newPassword,
      recoveryCode: code || "",
    };

    try {
      await createNewPassword(args).unwrap();

      await router.replace("./sign-in");
    } catch (err) {
      const { status } = err as FetchBaseQueryError;

      if (status === 400) {
        await router.replace("./email-email-verification");
      }
    }
    reset(defaultValues);
  };

  return { control, errors, handleSubmit, isLoading, newPasswordCreator, t };
};
