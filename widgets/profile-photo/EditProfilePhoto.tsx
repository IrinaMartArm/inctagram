import React, { ChangeEvent, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

import { convertFileToBase64 } from "@/shared/assets/helpers";
import { Avatar, AvatarEdit, Button } from "@/shared/components";
import { Alert } from "@/shared/components/alert";
import { Modal } from "@/shared/components/modals";

import s from "./edit-profilePhoto.module.scss";
import { useTranslation } from "@/shared/assets/hooks/useTranslation";

const MAX_SIZE_FILE = 10 * 1024 * 1024;

type Props = {
  defaultOpen: boolean;
  isShowAvatarEditor?: boolean;
  photo?: string;
  setIsShowModal: (isShowModal: boolean) => void;
  updateAvatar: (avatar: File | undefined) => void;
  error?: string;
};

export const EditProfilePhoto = ({
  defaultOpen,
  isShowAvatarEditor,
  photo,
  setIsShowModal,
  updateAvatar,
  error,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<AvatarEditor | null>(null);
  const [isShowEditor, setIsShowEditor] = useState(isShowAvatarEditor);
  const [image, setImage] = useState<ArrayBuffer | null | string>(
    photo ?? null,
  );
  const { t } = useTranslation();
  const { errors, savePhoto, selectPhoto, addPhoto } =
    t.profileSettings.general;

  const [errorFile, setErrorFile] = useState<null | string>(null);

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size > MAX_SIZE_FILE) {
        setErrorFile(errors.maxSize);

        return;
      }

      const validFileTypes = ["image/jpeg", "image/png"];

      if (!validFileTypes.includes(file.type)) {
        setErrorFile(errors.formatFile);

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
    <Modal defaultOpen={defaultOpen} title={addPhoto}>
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
              <Button onClick={saveImage} variant={"primary"}>
                {savePhoto}
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
                {selectPhoto}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
