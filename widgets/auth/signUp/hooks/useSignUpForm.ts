import { useForm } from "react-hook-form";

import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import {
  SignUpFormFields,
  signUpSchema,
} from "@/widgets/auth/signUp/validators/validators";
import { zodResolver } from "@hookform/resolvers/zod";

export const useSignUp = () => {
  const { locale, t } = useTranslation();

  const defaultValues = {
    agree: false,
    confirm: "",
    email: "",
    password: "",
    username: "",
  };

  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    reset,
    setError,
    setValue,
  } = useForm<SignUpFormFields>({
    defaultValues,
    mode: "onBlur",
    resolver: zodResolver(signUpSchema(t)),
  });

  return {
    control,
    errors,
    getValues,
    handleSubmit,
    isValid,
    locale,
    reset,
    setError,
    setValue,
    t,
  };
};
