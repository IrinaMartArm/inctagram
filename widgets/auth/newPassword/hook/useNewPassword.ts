import { useForm } from "react-hook-form";

import { ParsedUrlQuery } from "querystring";

import { useCreateNewPasswordMutation } from "@/shared/assets/api/auth/auth-api";
import { handleErrorResponse } from "@/shared/assets/helpers/handleErrorResponse";
import { useTranslationPages } from "@/shared/assets/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/router";
import z from "zod";

export const useNewPassword = () => {
  const router = useRouter();
  const { t } = useTranslationPages();

  const newPasswordSchema = z
    .object({
      newPassword: z
        .string()
        .min(6, t.passwordMin)
        .max(20, t.passwordMax)
        .trim(),
      passwordConfirmation: z
        .string()
        .min(6, t.confirm)
        .max(20, t.confirm)
        .trim(),
    })
    .refine((value) => value.newPassword === value.passwordConfirmation, {
      message: t.confirm,
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

  const query: ParsedUrlQuery = router.query;
  const code = query.recoveryCode as string;

  const newPasswordCreator = async (data: NewPasswordFormFields) => {
    const args = {
      newPassword: data.newPassword,
      recoveryCode: code || "",
    };

    try {
      await createNewPassword(args).unwrap();
      await router.replace("/sign-in");
    } catch (err: any) {
      const { status } = err as FetchBaseQueryError;

      if (status === 400) {
        await router.replace("/auth/email-verification");
      }
      handleErrorResponse(err);
    }
    reset(defaultValues);
  };

  return { control, errors, handleSubmit, isLoading, newPasswordCreator, t };
};
