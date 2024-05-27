import { useState } from "react";
import { useForm } from "react-hook-form";

import { useFillOutProfileMutation } from "@/shared/assets/api/profile/profile-api";
import { useTranslationPages } from "@/shared/assets/hooks";
import { AlertVariant } from "@/shared/components/alert/Alert";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export const useProfileForm = () => {
  const { t } = useTranslationPages();
  let initUsername;

  if (typeof window !== "undefined") {
    initUsername = localStorage.getItem("username");
  }

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertVariant, setAlertVariant] = useState<AlertVariant>("success");

  const sixteenYearsAgo = new Date();

  sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);

  const profileFormSchema = z.object({
    aboutMe: z.string().max(20).optional(),
    city: z.string().optional(),
    dateOfBirth: z
      .string()
      .refine(
        (dateString) => {
          const dateOfBirth = new Date(dateString);

          return dateOfBirth <= sixteenYearsAgo;
        },
        {
          message: t.errors.child,
        },
      )
      .optional(),
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    username: z.string().min(6).max(30),
  });

  type ProfileFormSchema = z.infer<typeof profileFormSchema>;

  const defaultValues = {
    firstName: "",
    lastName: "",
    username: initUsername || "",
  };

  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
  } = useForm<ProfileFormSchema>({
    defaultValues,
    mode: "onBlur",
    resolver: zodResolver(profileFormSchema),
  });

  const [fillOutProfile, {}] = useFillOutProfileMutation();

  const alertHandler = () => {
    setShowAlert(!showAlert);
  };

  const onSubmit = async (data: ProfileFormSchema) => {
    try {
      await fillOutProfile(data).unwrap();
      setAlertMessage(t.success);
      setAlertVariant("success");
      alertHandler();
    } catch (error) {
      setAlertMessage(t.errors.fell);
      setAlertVariant("error");
      alertHandler();
    }
  };

  return {
    alertHandler,
    alertMessage,
    alertVariant,
    control,
    errors,
    handleSubmit,
    isValid,
    onSubmit,
    showAlert,
  };
};
