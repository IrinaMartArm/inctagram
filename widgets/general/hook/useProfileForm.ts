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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
        { message: t.errors.child },
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

  const defaultValues = {
    firstName: firstName,
    lastName: lastName,
    username: initUsername || "",
  };

  const {
    control,
    formState: { isValid },
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
    setFirstName(data.firstName);
    setLastName(data.lastName);
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
    handleSubmit,
    isValid,
    onSubmit,
    showAlert,
  };
};
