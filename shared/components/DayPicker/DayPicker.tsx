import React, { useState } from "react";
import { DayPicker as ReactDayPicker } from "react-day-picker";

import { Input } from "@/shared/components";

import "./DayPicker.scss";
import "react-day-picker/dist/style.css";

import s from "./DayPicker.module.scss";

export const DayPicker = () => {
  const [selected, setSelected] = useState<Date>();

  const onClick = () => {
    alert("onClick");
  };

  const dateFormatted = selected
    ? `${(selected.getDate() < 10 ? "0" : "") + selected.getDate()}.${(selected.getMonth() < 9 ? "0" : "") + (selected.getMonth() + 1)}.${selected.getFullYear()}`
    : "";

  const weekends = [5, 6];
  const weekendStyle = { color: "#F23D61" };

  return (
    <>
      <div className={s.inputContainer}>
        <Input
          isShowButton
          label={"Date select"}
          onChange={() => {}}
          onClick={onClick}
          type={"text"}
          value={dateFormatted}
        />
      </div>
      <ReactDayPicker
        mode={"single"}
        modifiers={{ weekend: (day) => weekends.includes(day.getDay()) }}
        modifiersStyles={{ weekend: weekendStyle }}
        onSelect={setSelected}
        selected={selected}
        showOutsideDays
      />
    </>
  );
};
