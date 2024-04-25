import React, { useState } from "react";
import {
  ClassNames,
  DateRange,
  DayPicker as ReactDayPicker,
} from "react-day-picker";

import { Input } from "@/shared/components";
import { clsx } from "clsx";
import { format } from "date-fns";

import styles from "../../../node_modules/react-day-picker/dist/style.module.css";
import s from "./DayPicker.module.scss";

export const DayPicker = (props: PropsType) => {
  const [selected, setSelected] = useState<Date>();
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [isPickerSingleHidden, setIsPickerSingleHidden] =
    useState<boolean>(true);

  const onClick = () => {
    setIsPickerSingleHidden(false);
  };

  const onSelect = (date: "" | Date) => {
    if (!date) {
      return;
    }
    setSelected(date);
    setIsPickerSingleHidden(true);
  };

  const dateSingle = selected
    ? `${(selected.getDate() < 10 ? "0" : "") + selected.getDate()}.${(selected.getMonth() < 9 ? "0" : "") + (selected.getMonth() + 1)}.${selected.getFullYear()}`
    : "";

  const DateFormat = "dd.MM.yyyy";
  const dateFrom = range?.from ? format(range.from, DateFormat) : "";
  const dateTo = range?.to ? format(range.to, DateFormat) : "";
  const dateRange = dateFrom && dateTo ? dateFrom + " - " + dateTo : "";

  const weekends = [5, 6];
  const weekendStyle = { color: "#F23D61" };

  const classNames: ClassNames = {
    ...styles,
    ...s,
    caption: clsx(styles.caption, s.caption),
    day: clsx(styles.day, s.day),
    nav_button: clsx(styles.nav_button, s.nav_button),
    root: clsx(styles.root, s.root),
  };

  return (
    <>
      <div
        className={
          props.mode === "single"
            ? s.inputSingleContainer
            : s.inputRangeContainer
        }
        onClick={onClick}
      >
        <Input
          isShowButton
          label={"Date select"}
          type={"datePicker"}
          value={props.mode === "single" ? dateSingle : dateRange}
        />
      </div>
      {props.mode === "single" && (
        <>
          {!isPickerSingleHidden && (
            <div className={s.pickerContainer}>
              <ReactDayPicker
                classNames={classNames}
                mode={"single"}
                modifiers={{
                  weekend: (day) => weekends.includes(day.getDay()),
                }}
                modifiersStyles={{ weekend: weekendStyle }}
                onSelect={(date) => onSelect(date ? date : "")}
                selected={selected}
                showOutsideDays
              />
            </div>
          )}
        </>
      )}
      {props.mode === "range" && (
        <>
          <div className={s.pickerContainer}>
            <ReactDayPicker
              classNames={classNames}
              mode={"range"}
              modifiers={{
                weekend: (day) => weekends.includes(day.getDay()),
              }}
              modifiersStyles={{ weekend: weekendStyle }}
              onSelect={setRange}
              selected={range}
              showOutsideDays
            />
          </div>
        </>
      )}
    </>
  );
};

type PropsType = {
  mode: "range" | "single";
};
