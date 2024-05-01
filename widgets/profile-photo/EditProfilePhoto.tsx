import React, { ChangeEvent, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

import { Avatar, AvatarEdit, Button } from "@/shared/components";
import { Alert } from "@/shared/components/alert";
import { Modal } from "@/shared/components/modals";

import s from "./edit-profilePhoto.module.scss";

type Props = {
  ava?: string;
  defaultOpen: boolean;
  error?: string;
  photo?: string;
  setAva?: (ava: string) => void;
  setIsShowModal?: (isShowModal: boolean) => void;
  title: string;
};

export const EditProfilePhoto = ({
  ava,
  defaultOpen,
  error,
  setAva,
  setIsShowModal,
  title,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<AvatarEditor | null>(null);
  const [isShowEditor, setIsShowEditor] = useState(false);
  const [image, setImage] = useState<ArrayBuffer | null | string>(null);

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();

      reader.onload = () => {
        setImage(reader.result);
        setIsShowEditor(true);
      };
      reader.readAsDataURL(e.target.files[0]);
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

      setAva && setAva(canvas.toDataURL());
      setIsShowEditor(false);
      setIsShowModal && setIsShowModal(false);
    }
  };

  return (
    <Modal defaultOpen={defaultOpen} title={title}>
      <div className={s.wrapper}>
        {error && <Alert isShowClose={false} title={error} variant={"error"} />}
        {isShowEditor && (
          <>
            <AvatarEdit photo={image as string} ref={editorRef} />
            <div className={s.wrapperButton}>
              <Button onClick={saveImage} variant={"primary"}>
                Save
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
                id={"input__file"}
                name={"file"}
                onChange={handleImgChange}
                ref={inputRef}
                type={"file"}
              />
              <Button
                as={"label"}
                className={s.selectButton}
                htmlFor={"input__file"}
                onClick={handleInputClick}
              >
                Select from Computer
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
