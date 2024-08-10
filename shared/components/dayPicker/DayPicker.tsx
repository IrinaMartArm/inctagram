import { useEffect, useRef, useState } from 'react'
import { ClassNames, DayPicker as ReactDayPicker, SelectSingleEventHandler } from 'react-day-picker'

import { useTranslation } from '@/shared/assets'
import { Input, Typography } from '@/shared/components'
import { useOutsideDayClick } from '@/shared/components/dayPicker/OutsideDayClickHook'
import { clsx } from 'clsx'
import { format, parse } from 'date-fns'

import s from './DayPicker.module.scss'
import sC from '@/shared/components/input/input.module.scss'
import styles from 'react-day-picker/dist/style.module.css'

export const DayPicker = (props: DayPickerProps) => {
  const { t } = useTranslation()
  const { errorMessage, label, onChange, selected } = props

  const [isPickerSingleHidden, setIsPickerSingleHidden] = useState<boolean>(true)
  const [localSelected, setLocalSelected] = useState<string | undefined>(selected)
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())

  useEffect(() => {
    onChange(localSelected)
    handleMonthChange(parseSelectedDate(localSelected) as Date)
  }, [localSelected, onChange])

  const weekends = [5, 6]
  const weekendStyle = { color: '#F23D61' }
  const DateFormat = 'dd.MM.yyyy'

  const classNames: ClassNames = {
    ...styles,
    ...s,
    caption: clsx(styles.caption, s.caption),
    caption_label: clsx(styles.caption_label, s.caption_label),
    day: clsx(styles.day, s.day),
    dropdown: clsx(styles.dropdown, s.dropdown),
    nav_button: clsx(styles.nav_button, s.nav_button),
    root: clsx(styles.root, s.root),
  }

  // Function to handle date selection in 'single' mode
  const handleSingleSelect: SelectSingleEventHandler = (date: Date | undefined) => {
    if (date) {
      setLocalSelected(format(date, DateFormat))
      setIsPickerSingleHidden(true)
    }
  }

  // Function to parse selected date if it exists
  const parseSelectedDate = (localSelected: string | undefined): Date | undefined => {
    return localSelected ? parse(localSelected, DateFormat, new Date()) : undefined
  }

  const onClickSingle = () => {
    setIsPickerSingleHidden(false)
  }

  const calendarRef = useRef<HTMLDivElement>(null)

  const handleOutsideClick = () => {
    setIsPickerSingleHidden(true)
  }

  useOutsideDayClick(calendarRef, handleOutsideClick)

  const currentTime = new Date()
  const currentYear = currentTime.getFullYear()
  const maxHumanAge = 122

  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month)
  }

  return (
    <div className={clsx(s.pickerContainer, s.scrollbar)} ref={calendarRef}>
      {label && (
        <Typography className={sC.label} variant={'regular_text-14'}>
          {label}
        </Typography>
      )}
      <Input
        errorMessage={errorMessage}
        onButtonClick={onClickSingle}
        onChange={e => setLocalSelected(e.target.value)}
        type={'datePicker'}
        value={localSelected || ''}
      />
      {!isPickerSingleHidden && (
        <div className={clsx(s.pickerContainer)}>
          <ReactDayPicker
            captionLayout={'dropdown-buttons'}
            classNames={classNames}
            fromYear={currentYear - maxHumanAge}
            mode={'single'}
            modifiers={{
              weekend: day => weekends.includes(day.getDay()),
            }}
            modifiersStyles={{ weekend: weekendStyle }}
            month={currentMonth}
            onMonthChange={handleMonthChange}
            onSelect={handleSingleSelect}
            selected={parseSelectedDate(localSelected)}
            showOutsideDays
            toYear={currentYear}
          />
        </div>
      )}
    </div>
  )
}

export type DayPickerProps = {
  errorMessage?: string
  label?: string
  onChange: (value: string | undefined) => void
  selected: string | undefined
}
