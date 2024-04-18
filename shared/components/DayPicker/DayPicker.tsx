import React, { useState } from "react";
import { DayPicker as ReactDayPicker } from "react-day-picker";

import { Input } from "@/shared/components";

import "./DayPicker.scss";
import "react-day-picker/dist/style.css";

import s from "./DayPicker.module.scss";

export const DayPicker = () => {
  const [selected, setSelected] = useState<Date>();
  const [isPickerHidden, setIsPickerHidden] = useState<boolean>(true);

  const onClick = () => {
    setIsPickerHidden(false);
  };

  const onSelect = (date: "" | Date) => {
    if (!date) {
      return;
    }
    setSelected(date);
    setIsPickerHidden(true);
  };

  const dateFormatted = selected
    ? `${(selected.getDate() < 10 ? "0" : "") + selected.getDate()}.${(selected.getMonth() < 9 ? "0" : "") + (selected.getMonth() + 1)}.${selected.getFullYear()}`
    : "";

  const weekends = [5, 6];
  const weekendStyle = { color: "#F23D61" };

  return (
    <>
      <div className={s.inputContainer} onClick={onClick}>
        <Input
          isShowButton
          label={"Date select"}
          type={"datePicker"}
          value={dateFormatted}
        />
      </div>
      {!isPickerHidden && (
        <ReactDayPicker
          mode={"single"}
          modifiers={{ weekend: (day) => weekends.includes(day.getDay()) }}
          modifiersStyles={{ weekend: weekendStyle }}
          onSelect={(date) => onSelect(date ? date : "")}
          selected={selected}
          showOutsideDays
        />
      )}
    </>
  );
};
