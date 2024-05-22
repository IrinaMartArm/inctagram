import { useState } from "react";

import {
  useDeleteUserPhotoMutation,
  useUploadUserPhotoMutation,
} from "@/shared/assets/api/profile/profile-api";
import {
  convertFileToBase64,
  handleErrorResponse,
} from "@/shared/assets/helpers";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type ErrorType = FetchBaseQueryError | SerializedError;

export const useUpdateAvatar = () => {
  const [avatar, setAvatar] = useState<string | undefined>(
    localStorage.getItem("myAvatar") ?? undefined,
  );

  const [setPhoto] = useUploadUserPhotoMutation();
  const [deletePhoto] = useDeleteUserPhotoMutation();

  const updateAvatar = async (newAvatar: File | undefined) => {
    try {
      if (newAvatar) {
        const formData = new FormData();

        formData.append("file", newAvatar);
        await setPhoto({ file: formData }).unwrap();
        convertFileToBase64(newAvatar, (file64: string) => {
          setAvatar(file64);
          localStorage.setItem("myAvatar", file64);
        });
      } else {
        await deletePhotoHandler();
      }
    } catch (err: unknown) {
      const error = err as ErrorType;

      handleErrorResponse(error);
    }
  };

  const deletePhotoHandler = async () => {
    try {
      await deletePhoto().unwrap();
      setAvatar(undefined);
      localStorage.removeItem("myAvatar");
    } catch (err: unknown) {
      const error = err as ErrorType;

      handleErrorResponse(error);
    }
  };

  return {
    avatar,
    deletePhotoHandler,
    updateAvatar,
  };
};
