import { LogOut_outline } from "@/public";
import { Button, Modal, ModalClose, Typography } from "@/shared/components";
import { useLogOut } from "@/widgets";

import s from "./logOutModal.module.scss";

type Props = {
  email?: string;
};
export const LogOutModal = ({ email }: Props) => {
  const { logOutCallback, t } = useLogOut();

  return (
    <Modal
      title={t.logOut.title}
      trigger={
        <Button className={s.trigger} variant={"link"}>
          <LogOut_outline />
          <Typography variant={"Medium_text-14"}>{t.logOut.title}</Typography>
        </Button>
      }
    >
      <div className={s.root}>
        <Typography variant={"regular_text-16"}>
          {t.logOut.warning}{" "}
          <Typography as={"span"} variant={"Bold_text-16"}>
            {email ?? ""}
          </Typography>
          ?
        </Typography>
        <div className={s.controller}>
          <Button
            className={s.button}
            onClick={logOutCallback}
            variant={"outlined"}
          >
            <Typography className={s.textButton} variant={"h3"}>
              {t.logOut.buttonYes}
            </Typography>
          </Button>
          <ModalClose>
            <Button className={s.button}>
              <Typography className={s.textButton} variant={"h3"}>
                {t.logOut.buttonNo}
              </Typography>
            </Button>
          </ModalClose>
        </div>
      </div>
    </Modal>
  );
};
