import { AvatarEdit, Button } from "@/shared/components";
import { Alert } from "@/shared/components/alert";
import { Modal } from "@/shared/components/modals";

import s from "./edit-profilePhoto.module.scss";

type Props = {
  defaultOpen: boolean;
  error?: string;
  photo?: string;
  title: "Add a Profile Photo";
};

export const EditProfilePhoto = ({
  defaultOpen,
  error,
  photo = "https://png.pngtree.com/thumb_back/fw800/background/20230527/pngtree-cute-little-dog-sitting-in-the-field-image_2689739.jpg",
  title,
}: Props) => {
  return (
    <Modal defaultOpen={defaultOpen} title={title}>
      <div className={s.wrapper}>
        {error && <Alert isShowClose={false} title={error} variant={"error"} />}
        <AvatarEdit photo={photo} />
        <div className={s.wrapperButton}>
          <Button variant={"primary"}>Save</Button>
        </div>
        <div className={s.wrapperInput}>
          <input
            className={s.input}
            id={"input__file"}
            name={"file"}
            type={"file"}
          />
          <Button as={"label"} htmlFor={"input__file"}>
            Select from Computer
          </Button>
        </div>
      </div>
    </Modal>
  );
};
