import { Provider } from "react-redux";

import { LogOut_outline } from "@/public";
import { useLogoutMutation } from "@/shared/assets/api/auth/auth-api";
import { store } from "@/shared/assets/api/store";
import { Button, Typography } from "@/shared/components";
import { Modal, ModalClose } from "@/shared/components/modals";
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
        <Button className={s.row} variant={"link"}>
          <LogOut_outline color={"#FFF"} />
          <Typography
            className={s.triggerButtonText}
            variant={"Medium_text-14"}
          >
            {t.logOut.title}
          </Typography>
        </Button>
      }
    >
      <div className={s.root}>
        <Typography variant={"regular_text-16"}>
          {t.logOut.warning}{" "}
          <Typography as={"span"} variant={"Bold_text-16"}>
            {email ?? "Epam@epam.com"}
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
