import {useRef, useState} from "react"
import {ClassNames, DayPicker as ReactDayPicker, SelectSingleEventHandler,} from "react-day-picker"

import {Input} from "@/shared/components"
import {clsx} from "clsx"
import {format, parse} from "date-fns"

import s from "./DayPicker.module.scss"
import styles from "react-day-picker/dist/style.module.css"
import {useOutsideDayClick} from "@/shared/components/DayPicker/OutsideDayClickHook"

export const DayPicker = (props: DayPickerProps) => {

  const {selected, setSelected} = props

  const [isPickerSingleHidden, setIsPickerSingleHidden] =
    useState<boolean>(true)

  const weekends = [5, 6]
  const weekendStyle = {color: "#F23D61"}

  const DateFormat = "dd.MM.yyyy"

  const classNames: ClassNames = {
    ...styles,
    ...s,
    caption: clsx(styles.caption, s.caption),
    day: clsx(styles.day, s.day),
    nav_button: clsx(styles.nav_button, s.nav_button),
    root: clsx(styles.root, s.root),
  }

  // Function to handle date selection in 'single' mode
  const handleSingleSelect: SelectSingleEventHandler = (
    date: Date | undefined,
  ) => {
    if (date) {
      setSelected(format(date, DateFormat))
      setIsPickerSingleHidden(true)
    }
  }

  // Function to parse selected date if it exists
  const parseSelectedDate = (
    selected: string | undefined,
  ): Date | undefined => {
    return selected ? parse(selected, DateFormat, new Date()) : undefined
  }

  const onClickSingle = () => {
    setIsPickerSingleHidden(false)
  }

  const isValidDateFormat = (dateString: string) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/

    return dateRegex.test(dateString)
  }

  const dateSingleChecker = () => {
    return selected && !isValidDateFormat(selected) ? "Error!" : ""
  }

  const calendarRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = () => {
     setIsPickerSingleHidden(true)
  };

  useOutsideDayClick(calendarRef, handleOutsideClick);

  return (
    <div className={s.pickerContainer} >
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
        <div className={s.pickerContainer} ref={calendarRef}>
          <ReactDayPicker
            classNames={classNames}
            mode={"single"}
            modifiers={{
              weekend: (day) => weekends.includes(day.getDay()),
            }}
            modifiersStyles={{weekend: weekendStyle}}
            onSelect={handleSingleSelect}
            selected={parseSelectedDate(selected)}
            showOutsideDays
          />
        </div>
      )}
    </div>
  )
}


type DayPickerProps = {
  selected: string;
  setSelected: (value: string) => void;
};

