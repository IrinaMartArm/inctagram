import { useState } from "react";
import { useForm } from "react-hook-form";

import { useFillOutProfileMutation } from "@/shared/assets/api/profile/profile-api";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { AlertVariant } from "@/shared/components/alert/Alert";
import z from "zod";

export const useProfileForm = () => {
  const { t } = useTranslation();
  const { child, fell, success } = t.profile.general;
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertVariant, setAlertVariant] = useState<AlertVariant>("success");

  const profileFormSchema = z
    .object({
      aboutMe: z.string().max(200).optional(),
      city: z.string().min(1).optional(),
      dateOfBirth: z.date().refine(
        (value) => {
          const dateOfBirth = new Date(value);
          const today = new Date();
          const monthDiff = today.getMonth() - dateOfBirth.getMonth();
          const isUnderage =
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < dateOfBirth.getDate());

          return !isUnderage;
        },
        { message: child },
      ),
      firstName: z.string().min(1).max(50),
      lastName: z.string().min(1).max(50),
      username: z.string().min(6).max(30),
    })
    .transform((data) => ({
      ...data,
      dateOfBirth: data.dateOfBirth.toISOString(), // Конвертация date в string
    }));

  type ProfileFormSchema = z.infer<typeof profileFormSchema>;

  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
  } = useForm<ProfileFormSchema>();

  const [fillOutProfile, {}] = useFillOutProfileMutation();

  const alertHandler = () => {
    setShowAlert(!showAlert);
  };

  const onSubmit = async (data: ProfileFormSchema) => {
    try {
      console.log(data);

      await fillOutProfile(data).unwrap();
      setAlertMessage(success);
      setAlertVariant("success");
      alertHandler();
    } catch (error) {
      setAlertMessage(fell);
      setAlertVariant("error");
      alertHandler();
    }
  };

  return {
    alertHandler,
    alertMessage,
    alertVariant,
    control,

    handleSubmit,
    isValid,
    onSubmit,
    setValue,
    showAlert,
  };
};
