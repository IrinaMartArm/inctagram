import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useCreateNewPasswordMutation } from "@/shared/assets/api/auth/auth-api";
import { handleErrorResponse } from "@/shared/assets/helpers/handleErrorResponse";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import z from "zod";

export const useNewPassword = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { confirm, created, passwordMax, passwordMin } = t.signUp;

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
    setError,
  } = useForm<NewPasswordFormFields>({
    defaultValues,
    mode: "onBlur",
    resolver: zodResolver(newPasswordSchema),
  });

  const [createNewPassword, { isLoading }] = useCreateNewPasswordMutation();

  const newPasswordCreator = (data: NewPasswordFormFields) => {
    const args = {
      newPassword: data.newPassword,
      recoveryCode: code || "",
    };

    createNewPassword(args)
      .then((res) => {
        if ("error" in res) {
          return handleErrorResponse(res.error);
        } else {
          toast.success(created);
        }
      })
      .then((error) => {
        if (error && error.fieldErrors) {
          error.fieldErrors?.forEach((el) => {
            setError(el.field as keyof NewPasswordFormFields, {
              message: el.message,
            });
          });
        }
      });
    reset(defaultValues);
  };

  return { control, errors, handleSubmit, isLoading, newPasswordCreator, t };
};
