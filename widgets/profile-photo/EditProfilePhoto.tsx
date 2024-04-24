import { AvatarEdit, Button } from "@/shared/components";
import { Modal } from "@/shared/components/modals";

import s from "./edit-profilePhoto.module.scss";

type Props = {
  defaultOpen: boolean;
  photo?: string;
  title: "Add a Profile Photo";
};

export const EditProfilePhoto = ({
  defaultOpen,
  photo = "https://png.pngtree.com/thumb_back/fw800/background/20230527/pngtree-cute-little-dog-sitting-in-the-field-image_2689739.jpg",
  title,
}: Props) => {
  return (
    <Modal defaultOpen={defaultOpen} title={title}>
      <div className={s.wrapper}>
        <AvatarEdit photo={photo} />
        <div className={s.wrapperButton}>
          <Button variant={"primary"}>Save</Button>
        </div>
      </div>
    </Modal>
  );
};
