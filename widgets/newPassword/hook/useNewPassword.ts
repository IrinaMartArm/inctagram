import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useCreateNewPasswordMutation } from "@/shared/assets/api/auth/auth-api";
import { handleErrorResponse } from "@/shared/assets/helpers/handleErrorResponse";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import z from "zod";

export const useNewPassword = () => {
  const { t } = useTranslation();
  const { confirm, created, passwordMax, passwordMin } = t.signUp;
  const router = useRouter();
  const code = Array.isArray(router.query.code)
    ? router.query.code[0]
    : router.query.code;

  const newPasswordSchema = z
    .object({
      password: z.string().min(6, passwordMin).max(20, passwordMax).trim(),
      passwordConfirmation: z.string().min(6, confirm).max(20, confirm).trim(),
    })
    .refine((value) => value.password === value.passwordConfirmation, {
      message: confirm,
      path: ["passwordConfirmation"],
    });

  type NewPasswordFormFields = z.infer<typeof newPasswordSchema>;

  const defaultValues = {
    password: "",
    passwordConfirmation: "",
  };

  const { control, handleSubmit, reset, setError } =
    useForm<NewPasswordFormFields>({
      defaultValues,
      mode: "onBlur",
      resolver: zodResolver(newPasswordSchema),
    });
  const [createNewPassword, { isLoading }] = useCreateNewPasswordMutation();

  const newPasswordCreator = (data: NewPasswordFormFields) => {
    createNewPassword({
      newPassword: data.password,
      recoveryCode: code || "",
    })
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

  return { control, handleSubmit, isLoading, newPasswordCreator, t };
};
