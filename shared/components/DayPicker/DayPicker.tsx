import { useState } from "react";
import {
  ClassNames,
  DateRange,
  DayPicker as ReactDayPicker,
  SelectRangeEventHandler,
  SelectSingleEventHandler,
} from "react-day-picker";

import { Input } from "@/shared/components";
import { clsx } from "clsx";
import { format, parse } from "date-fns";

import s from "./DayPicker.module.scss";
import styles from "react-day-picker/dist/style.module.css";

export const DayPicker = (props: DayPickerProps) => {
  // let mode: 'range' | 'single'
  let range: Array<string> | undefined;
  let setRange: (newRange: Array<string>) => void;
  let selected: string | undefined;
  let setSelected: (value: string) => void;

  const [isPickerSingleHidden, setIsPickerSingleHidden] =
    useState<boolean>(true);

  const [isPickerRangeHidden, setIsPickerRangeHidden] = useState<boolean>(true);

  if (props.mode === "range") {
    ({ range, setRange } = props as RangeDayPickerProps);
  } else if (props.mode === "single") {
    ({ selected, setSelected } = props as SingleDayPickerProps);
  }

  const weekends = [5, 6];
  const weekendStyle = { color: "#F23D61" };

  const DateFormat = "dd.MM.yyyy";
  const dateFrom = range ? range[0] : "";
  const dateTo = range ? range[1] : "";
  const dateRange = dateFrom && dateTo ? dateFrom + " - " + dateTo : "";

  const classNames: ClassNames = {
    ...styles,
    ...s,
    caption: clsx(styles.caption, s.caption),
    day: clsx(styles.day, s.day),
    nav_button: clsx(styles.nav_button, s.nav_button),
    root: clsx(styles.root, s.root),
  };

  // Internal state to track selected start and end dates in 'range' mode
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  // Flag to track if start date is selected
  const [startSelected, setStartSelected] = useState<boolean>(false);

  // Function to handle date selection in 'range' mode
  const handleRangeSelect: SelectRangeEventHandler = (
    dates: DateRange | undefined,
  ) => {
    if (dates && dates.from && dates.to) {
      // Check if both dates are present
      setSelectedRange(dates); // Update internal state
      const formattedDates = [
        format(dates.from, DateFormat),
        format(dates.to, DateFormat),
      ];

      setRange(formattedDates);
      setIsPickerRangeHidden(true);
    }
  };

  // Function to handle click on date in 'range' mode
  const handleDayClick = (date: Date) => {
    if (!startSelected) {
      // If start date is not selected yet
      setStartSelected(true); // Set flag that start date is selected
      setSelectedRange({ from: date, to: date }); // Set start and end dates simultaneously
    } else {
      // If start date is already selected
      setSelectedRange((prevState) => ({ from: prevState.from, to: date })); // Set only end date
      setStartSelected(false); // Reset flag
    }
  };

  // Function to handle date selection in 'single' mode
  const handleSingleSelect: SelectSingleEventHandler = (
    date: Date | undefined,
  ) => {
    if (date) {
      setSelected(format(date, DateFormat));
      setIsPickerSingleHidden(true);
    }
  };

  // Function to parse selected date if it exists
  const parseSelectedDate = (
    selected: string | undefined,
  ): Date | undefined => {
    return selected ? parse(selected, DateFormat, new Date()) : undefined;
  };

  const onClickSingle = () => {
    setIsPickerSingleHidden(false);
  };

  const onClickRange = () => {
    setIsPickerRangeHidden(false);
  };

  const isValidDateFormat = (dateString: string) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

    return dateRegex.test(dateString);
  };

  const dateSingleChecker = () => {
    return selected && !isValidDateFormat(selected) ? "Error!" : "";
  };

  return (
    <div className={s.pickerContainer}>
      {props.mode === "single" && (
        <>
          <div className={s.inputSingleContainer}>
            <Input
              errorMessage={dateSingleChecker()}
              onButtonClick={onClickSingle}
              onChange={(e) => setSelected(e.target.value)}
              type={"datePicker"}
              value={selected || ""}
            />
          </div>
          {!isPickerSingleHidden && (
            <div className={s.pickerContainer}>
              <ReactDayPicker
                classNames={classNames}
                mode={"single"}
                modifiers={{
                  weekend: (day) => weekends.includes(day.getDay()),
                }}
                modifiersStyles={{ weekend: weekendStyle }}
                onSelect={handleSingleSelect}
                selected={parseSelectedDate(selected)}
                showOutsideDays
              />
            </div>
          )}
        </>
      )}
      {props.mode === "range" && (
        <>
          <div className={s.inputRangeContainer} onClick={onClickRange}>
            <Input
              onChange={(e) => setRange([e.target.value])}
              type={"datePicker"}
              value={dateRange || ""}
            />
          </div>
          {!isPickerRangeHidden && (
            <div className={s.pickerContainer}>
              <ReactDayPicker
                classNames={classNames}
                mode={"range"}
                modifiers={{
                  weekend: (day) => weekends.includes(day.getDay()),
                }}
                modifiersStyles={{ weekend: weekendStyle }}
                onDayClick={handleDayClick}
                onSelect={handleRangeSelect}
                selected={selectedRange}
                showOutsideDays
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

type DayPickerProps = RangeDayPickerProps | SingleDayPickerProps;

type SingleDayPickerProps = {
  mode: "single";
  selected: string;
  setSelected: (value: string) => void;
};

type RangeDayPickerProps = {
  mode: "range";
  range: Array<string>;
  setRange: (newRange: Array<string>) => void;
};
