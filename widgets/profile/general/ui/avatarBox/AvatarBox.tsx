import { useTranslation } from "@/shared/assets/hooks";
import { Avatar, Button } from "@/shared/components";

import s from "./avatarBox.module.scss";

type Props = {
  avatar?: string;
  deletePhoto: () => void;
  setIsShowModal: (isShow: boolean) => void;
};

export const AvatarBox = ({ avatar, deletePhoto, setIsShowModal }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={s.wrapper}>
      <Avatar
        alt={"avatar"}
        className={s.avatar}
        deleteAvatar={deletePhoto}
        isEditProfile
        src={avatar}
      />
      <Button
        className={s.button}
        onClick={() => setIsShowModal(true)}
        variant={"outlined"}
      >
        {t.profileSettings.general.addPhoto}
      </Button>
    </div>
  );
};
