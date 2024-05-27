import {useEffect, useRef, useState} from "react"
import {ClassNames, DayPicker as ReactDayPicker, SelectSingleEventHandler,} from "react-day-picker"

import {Input} from "@/shared/components"
import {clsx} from "clsx"
import {format, parse} from "date-fns"

import s from "./DayPicker.module.scss"
import styles from "react-day-picker/dist/style.module.css"
import {useOutsideDayClick} from "@/shared/components/DayPicker/OutsideDayClickHook"

export const DayPicker = (props: DayPickerProps) => {

  const {setSelected, errorText} = props

  const [isPickerSingleHidden, setIsPickerSingleHidden] =
    useState<boolean>(true)
  const [localSelected, setLocalSelected] = useState('')

  useEffect(() => {
    if (isValidDateFormat(localSelected)) {
      setSelected(localSelected)
    } else {
      setSelected('')
    }

  }, [localSelected]);

  const weekends = [5, 6]
  const weekendStyle = {color: "#F23D61"}

  const DateFormat = "dd.MM.yyyy"

  const classNames: ClassNames = {
    ...styles,
    ...s,
    caption: clsx(styles.caption, s.caption),
    // table: clsx(styles.table, s.table),
    day: clsx(styles.day, s.day),
    nav_button: clsx(styles.nav_button, s.nav_button),
    root: clsx(styles.root, s.root),
    dropdown: clsx(styles.dropdown, s.dropdown),
    caption_label: clsx(styles.caption_label, s.caption_label),

  }

  // Function to handle date selection in 'single' mode
  const handleSingleSelect: SelectSingleEventHandler = (
    date: Date | undefined,
  ) => {
    if (date) {
      setLocalSelected(format(date, DateFormat))
      setIsPickerSingleHidden(true)
    }
  }

  // Function to parse selected date if it exists
  const parseSelectedDate = (
    localSelected: string | undefined,
  ): Date | undefined => {
    return localSelected ? parse(localSelected, DateFormat, new Date()) : undefined
  }

  const onClickSingle = () => {
    setIsPickerSingleHidden(false)
  }

  const isValidDateFormat = (dateString: string) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/

    return dateRegex.test(dateString)
  }

  const dateSingleChecker = () => {
    return localSelected && !isValidDateFormat(localSelected) ? "Date format error!" : ""
  }

  const calendarRef = useRef<HTMLDivElement>(null)

  const handleOutsideClick = () => {
    setIsPickerSingleHidden(true)
  }

  useOutsideDayClick(calendarRef, handleOutsideClick)

  let currentTime = new Date()
  let currentYear = currentTime.getFullYear()
  let maxHumanAge = 122

  return (
    <div className={s.pickerContainer}>
      <Input
        errorMessage={dateSingleChecker() || errorText}
        onButtonClick={onClickSingle}
        onChange={(e) => setLocalSelected(e.target.value)}
        type={"datePicker"}
        value={localSelected || ""}
      />
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
            selected={parseSelectedDate(localSelected)}
            showOutsideDays
            captionLayout='dropdown-buttons'
            fromYear={currentYear - maxHumanAge}
            toYear={currentYear}
          />
        </div>
      )}
    </div>
  )
}


export type DayPickerProps = {
  setSelected: (value: string) => void;
  errorText?: string
};

