import { useState } from "react";

import { addPhotoActions } from "@/entities";
import { useAppDispatch } from "@/shared/assets/api/store";
import { Button, Modal, ModalClose, Typography } from "@/shared/components";
import { useAddPhotoForm } from "@/widgets/addPhotoForm/hooks";

import s from "./confirmableModal.module.scss";
type Props = {
  confirmOpen: boolean;
  setConfirmOpen: (val: boolean) => void;
  setOpen: (val: boolean) => void;
};
export const ConfirmableModal = ({
  confirmOpen,
  setConfirmOpen,
  setOpen,
}: Props) => {
  const { t } = useAddPhotoForm();
  const dispatch = useAppDispatch();
  const handleConfirmClose = () => {
    dispatch(addPhotoActions.discardAll());
    setOpen(false);
    setConfirmOpen(false);
  };

  const handleCancelClose = () => {
    setConfirmOpen(false);
  };

  return (
    <Modal
      className={s.modal}
      onOpenChange={setConfirmOpen}
      open={confirmOpen}
      title={"Close"}
    >
      <div className={s.root}>
        <Typography variant={"regular_text-16"}>
          {t.addPhotoForm.warningQ}
        </Typography>
        <br />
        <Typography variant={"regular_text-16"}>
          {t.addPhotoForm.warningR}
        </Typography>
        <div className={s.controller}>
          <Button onClick={handleConfirmClose} variant={"outlined"}>
            <Typography variant={"h3"}>{t.addPhotoForm.discard}</Typography>
          </Button>
          <ModalClose>
            <Button onClick={handleCancelClose}>
              <Typography variant={"h3"}>{t.addPhotoForm.saveDraft}</Typography>
            </Button>
          </ModalClose>
        </div>
      </div>
    </Modal>
  );
};
