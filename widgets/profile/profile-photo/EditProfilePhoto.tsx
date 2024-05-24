import React, { ChangeEvent, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

import { checkPhoto, convertFileToBase64 } from "@/shared/assets/helpers";
import { useTranslationPages } from "@/shared/assets/hooks";
import { Alert, Avatar, AvatarEdit, Button, Modal } from "@/shared/components";

import s from "./edit-profilePhoto.module.scss";

type Props = {
  defaultOpen: boolean;
  error?: string;
  isShowAvatarEditor?: boolean;
  photo?: string;
  setIsShowModal: (isShowModal: boolean) => void;
  updateAvatar: (avatar: File | undefined) => void;
};

export const EditProfilePhoto = ({
  defaultOpen,
  error,
  isShowAvatarEditor,
  photo,
  setIsShowModal,
  updateAvatar,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<AvatarEditor | null>(null);
  const [isShowEditor, setIsShowEditor] = useState(isShowAvatarEditor);
  const [image, setImage] = useState<ArrayBuffer | null | string>(
    photo ?? null,
  );
  const { t } = useTranslationPages();

  const [errorFile, setErrorFile] = useState<null | string>(null);

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      const error = checkPhoto(file, t.errors.maxSize, t.errors.formatFile);

      if (error) {
        setErrorFile(error);

        return;
      }

      convertFileToBase64(file, (file64: string) => {
        setErrorFile(null);
        setImage(file64);
        setIsShowEditor(true);
      });
    }
  };

  const handleInputClick = (
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>,
  ) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const saveImage = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();
      const dataUrl = canvas.toDataURL();

      fetch(dataUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });

          updateAvatar(file);
        });

      setIsShowEditor(false);
      setIsShowModal(false);
    }
  };

  return (
    <Modal defaultOpen={defaultOpen} title={t.addPhoto}>
      <div className={s.wrapper}>
        {(errorFile || error) && (
          <Alert
            isShowClose={false}
            title={errorFile || error || ""}
            variant={"error"}
          />
        )}
        {isShowEditor && (
          <>
            <AvatarEdit image={image as string} ref={editorRef} />
            <div className={s.wrapperButton}>
              <Button
                className={s.selectButton}
                onClick={saveImage}
                variant={"primary"}
              >
                {t.savePhoto}
              </Button>
            </div>
          </>
        )}

        {!isShowEditor && (
          <>
            <Avatar alt={"avatar"} className={s.avatar} isEditProfile />

            <div className={s.wrapperInput}>
              <input
                className={s.input}
                id={"input-file"}
                name={"file"}
                onChange={handleImgChange}
                ref={inputRef}
                type={"file"}
              />
              <Button
                as={"label"}
                className={s.selectButton}
                htmlFor={"input-file"}
                onClick={handleInputClick}
              >
                {t.selectPhoto}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
