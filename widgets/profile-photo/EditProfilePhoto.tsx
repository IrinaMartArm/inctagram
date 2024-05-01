import { ChangeEvent, useRef } from "react";

import { AvatarEdit, Button } from "@/shared/components";
import { Alert } from "@/shared/components/alert";
import { Modal } from "@/shared/components/modals";

import s from "./edit-profilePhoto.module.scss";

type Props = {
  ava?: any;
  defaultOpen: boolean;
  error?: string;
  photo?: string;
  setAva?: (ava: any) => void;
  setIsShowModal?: (isShowModal: boolean) => void;
  title: "Add a Profile Photo";
};

export const EditProfilePhoto = ({
  ava,
  defaultOpen,
  error,
  setAva,
  title,
}: Props) => {
  const inputRef = useRef<any>(null);

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      console.log("file: ", file);

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          console.log("file64: ", file64);
          setAva && setAva(file64);
        });
      } else {
        console.error("Error: ", "Файл слишком большого размера");
      }
    }
  };

  const convertFileToBase64 = (
    file: File,
    callBack: (value: string) => void,
  ) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const file64 = reader.result as string;

      callBack(file64);
    };
    reader.readAsDataURL(file);
  };
  const handleInputClick = (e: any) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const saveImage = () => {};

  return (
    <Modal defaultOpen={defaultOpen} title={title}>
      <div className={s.wrapper}>
        {error && <Alert isShowClose={false} title={error} variant={"error"} />}
        <AvatarEdit photo={ava} />
        <div className={s.wrapperButton}>
          <Button onClick={saveImage} variant={"primary"}>
            Save
          </Button>
        </div>

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
            htmlFor={"input__file"}
            onClick={handleInputClick}
          >
            Select from Computer
          </Button>
        </div>
      </div>
    </Modal>
  );
};
