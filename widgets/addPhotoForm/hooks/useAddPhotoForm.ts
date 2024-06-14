import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

import { ModalState, addPhotoActions, authActions } from "@/entities";
import { useFormRevalidate, useTranslationPages } from "@/shared/assets";
import { LoginArgs } from "@/shared/assets/api/auth/types";
import { useAddPostMutation } from "@/shared/assets/api/post/post-api";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "@/shared/assets/api/store";
import { convertFileToBase64, getCroppedImg } from "@/shared/assets/helpers";
import { filteredImg } from "@/shared/assets/helpers/getImgWithFilter";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";
import { CropArg } from "@/shared/assets/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { z } from "zod";

export const useAddPhotoForm = () => {
  const dispatch = useAppDispatch();
  const { cropImages, cropImagesWithFilter, images, modalState } =
    useAppSelector((state: RootState) => state.addPhoto);
  const { locale, t } = useTranslationPages();
  const [errorFile, setErrorFile] = useState<null | string>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [aspect, setAspect] = useState(1);
  const [zoomValue, setZoomValue] = useState([1, 3]);
  const menu = "scale-menu" || "zoom-menu" || "add-photos-menu";
  const [showMenu, setShowMenu] = useState<string | typeof menu>("");
  const [addPost] = useAddPostMutation();
  const imgChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size > 20 * 1024 * 1024) {
        setErrorFile(`File size exceeds ${20} MB`);

        return;
      }

      convertFileToBase64(file, (file64: string) => {
        if (images.length < 1) {
          dispatch(addPhotoActions.setModalStateTo("cropping"));
        }
        setErrorFile(null);
        dispatch(addPhotoActions.addImage(file64));
      });
    }
  };
  const deleteImgCallback = (index: number) => {
    dispatch(addPhotoActions.removeImage(index));
  };

  const showCroppedImage = async (
    index: number | undefined,
    croppedAreaPixels: CropArg | null,
  ) => {
    try {
      const croppedImage = await getCroppedImg({
        imageSrc: images[index as number],
        pixelCrop: croppedAreaPixels,
      });

      dispatch(
        addPhotoActions.addCropImage({
          cropImage: croppedImage as string,
          cropImageIndex: index as number,
        }),
      );
    } catch (e) {
      console.error(e);
    }
  };
  const showFilteredImage = async (
    index: number | undefined,
    activeFilter: string,
  ) => {
    try {
      const croppedImage = await filteredImg(
        cropImages[index as number],
        activeFilter,
      );

      if (croppedImage) {
        const croppedImageURL = URL.createObjectURL(croppedImage);

        dispatch(
          addPhotoActions.setCropImagesWithFilter({
            cropImageWithFilter: croppedImageURL,
            cropImageWithFilterIndex: index as number,
            filter: activeFilter,
          }),
        );
      }
    } catch (e) {
      console.error(e);
    }
  };
  const setModalStateCallback = (modal: ModalState) => {
    dispatch(addPhotoActions.setModalStateTo(modal));
  };
  const descriptionValidation = z.string().min(5, "Мин").trim().max(500, "Мах");

  const addPostSchema = z.object({
    description: descriptionValidation,
  });
  const defaultValues = {
    description: "",
  };
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm<{ description: string }>({
    defaultValues,
    mode: "onBlur",
    resolver: zodResolver(addPostSchema),
  });
  const imagesToSend = cropImagesWithFilter.map((obj) => obj.img);
  const onSubmit = async (data: { description: string }) => {
    try {
      const response = await addPost({
        description: data.description,
        images: imagesToSend,
      }).unwrap();

      console.log(response);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return {
    aspect,
    control,
    crop,
    cropImages,
    cropImagesWithFilter,
    deleteImgCallback,
    errorFile,
    errors,
    handleSubmit,
    images,
    imgChangeCallback,
    modalState,
    onSubmit,
    setAspect,
    setCrop,
    setModalStateCallback,
    setShowMenu,
    setZoomValue,
    showCroppedImage,
    showFilteredImage,
    showMenu,
    t,
    watch,
    zoomValue,
  };
};
