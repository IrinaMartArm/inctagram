import { useForm } from "react-hook-form";

import { useFillOutProfileMutation } from "@/shared/assets/api/profile/profile-api";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import z from "zod";

export const useProfileForm = () => {
  const { t } = useTranslation();
  const { child } = t.profile.general;
  const profileFormSchema = z.object({
    aboutMe: z.string().max(200).optional(),
    city: z.string().min(1).optional(),
    dateOfBirth: z.string(),
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    username: z.string().min(6).max(30),
  });

  type ProfileFormSchema = z.infer<typeof profileFormSchema>;

  const { control, handleSubmit } = useForm<ProfileFormSchema>();

  const [fillOutProfile, {}] = useFillOutProfileMutation();

  const onSubmit = async (data: ProfileFormSchema) => {
    try {
      await fillOutProfile(data).unwrap();
      alert("Your settings are saved!");
    } catch (error) {
      alert("Error! Server is not available!");
    }
  };

  return { control, handleSubmit, onSubmit };
};
