import React, { ChangeEvent, useRef } from "react";

import { ClosingCross } from "@/public";
import { Plus } from "@/public/icons/Plus";
import { Button } from "@/shared/components";

import s from "./addPhotosMenu.module.scss";

type Props = {
  deleteImgCallback: (ind: number) => void;
  images: string[] | undefined;
  imgChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const AddPhotosMenu = ({
  deleteImgCallback,
  images,
  imgChangeCallback,
}: Props) => {
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
  const photo = images?.map((el, index) => {
    return (
      <div className={s.photoContainer} key={index}>
        <Button
          className={s.closingCross}
          onClick={() => deleteImgCallback(index)}
          variant={"icon"}
        >
          <ClosingCross />
        </Button>
        <img alt={""} className={s.imgPhotosMenu} src={el} />
      </div>
    );
  });

  return (
    <div className={s.container}>
      {photo}
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
        variant={"icon"}
      >
        <Plus />
      </Button>
    </div>
  );
};
