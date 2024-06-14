import React, { ChangeEvent, useRef, useState } from "react";

import { PlusSquare_outline } from "@/public";
import { AddPhotoBackGround } from "@/public/icons/AddPhotoBackGround";
import { Button, Typography } from "@/shared/components";
import { Modal } from "@/shared/components/modals";
import { useAddPhotoForm } from "@/widgets/addPhotoForm/hooks";
import { ConfirmableModal } from "@/widgets/addPhotoForm/ui/confirmableModal/ConfirmableModal";
import { CroppingPhoto } from "@/widgets/addPhotoForm/ui/croppingPhoto/CroppingPhoto";
import { Filters } from "@/widgets/addPhotoForm/ui/filters/Filters";
import { Publication } from "@/widgets/addPhotoForm/ui/publication/Publication";

import s from "./addPhotoForm.module.scss";

type Props = {};
export const AddPhotoForm = ({}: Props) => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { deleteImgCallback, errorFile, imgChangeCallback, modalState, t } =
    useAddPhotoForm();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    imgChangeCallback(e);
  };
  const handleInputClick = (
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>,
  ) => {
    e.preventDefault();
    inputRef.current?.click();
  };
  const handleCloseClickOutside = () => {
    if (modalState === "add-photo") {
      setOpen(false);
    } else {
      setConfirmOpen(true);
    }
  };

  return (
    <Modal
      className={
        modalState === "filters" || modalState === "publication"
          ? s.withFilters
          : ""
      }
      handleCloseClickOutside={handleCloseClickOutside}
      onOpenChange={setOpen}
      open={open}
      title={modalState === "add-photo" ? "Add Photo" : ""}
      trigger={
        <Button className={s.row} variant={"link"}>
          <PlusSquare_outline />
          <Typography
            className={s.triggerButtonText}
            variant={"Medium_text-14"}
          >
            Создать
          </Typography>
        </Button>
      }
    >
      {modalState === "add-photo" && (
        <div className={s.root}>
          <AddPhotoBackGround />
          <div className={s.controller}>
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
              fullWidth
              htmlFor={"input-file"}
              onClick={handleInputClick}
            >
              <Typography variant={"h3"}>Select from computer</Typography>
            </Button>
            <Button fullWidth variant={"outlined"}>
              <Typography variant={"h3"}>open draft</Typography>
            </Button>
          </div>
          {errorFile && (
            <Typography className={s.error} variant={"error"}>
              {errorFile}
            </Typography>
          )}
        </div>
      )}
      {modalState === "cropping" && (
        <CroppingPhoto
          deleteImgCallback={deleteImgCallback}
          imgChangeCallback={imgChangeCallback}
        />
      )}
      {modalState === "filters" && <Filters />}
      {modalState === "publication" && <Publication />}
      {confirmOpen && (
        <ConfirmableModal
          confirmOpen={confirmOpen}
          setConfirmOpen={setConfirmOpen}
          setOpen={setOpen}
        />
      )}
    </Modal>
  );
};
