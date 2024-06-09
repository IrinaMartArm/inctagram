import { useState } from "react";

import { Slider } from "@/shared/components";

import s from "./zoomMenu.module.scss";
type Props = {
  setZoomValue: (val: number[]) => void;
  zoomValue: number[];
};
export const ZoomMenu = ({ setZoomValue, zoomValue }: Props) => {
  const handleOnValueChange = (value: number[]) => {
    setZoomValue(value);
  };

  return (
    <Slider
      className={s.slider}
      max={3}
      min={1}
      onValueChange={handleOnValueChange}
      step={0.1}
      value={zoomValue}
    />
  );
};
