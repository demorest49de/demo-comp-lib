import { ComponentProps, forwardRef, useState } from 'react'
import './react-datepicker.min.css'
import * as RDP from 'react-datepicker'
import { clsx } from 'clsx'
import { Calendar as CalendarIcon, CalendarOutline } from '../../../assets/components'
import { FieldValues } from 'react-hook-form'

import textFieldStyles from '../input/input.module.scss'
import s from './date-picker.module.scss'
import { CustomHeader } from './custom-header/custom-header'
import { formatWeekDay } from '@/lib/formatWeekDay'
import { Label } from '@/components/ui/label'

export type DatePickerProps = {
  years: number[]
  placeholder?: string
  startDate: Date | null
  setStartDate: (date: Date | null) => void
  label?: string
  errorMessage?: string
  disabled?: boolean
  endDate?: Date | null
  setEndDate?: (date: Date | null) => void
} & ComponentProps<'div'>

const RDPC = (((RDP.default as any).default as any) ||
  (RDP.default as any) ||
  (RDP as any)) as typeof RDP.default

export const DatePicker = forwardRef<FieldValues, DatePickerProps>(
  ({
    years,
    startDate,
    setStartDate,
    placeholder,
    label,
    errorMessage,
    endDate,
    setEndDate,
    disabled,
    className,
    ...rest
  }) => {
    const isRange = endDate !== undefined
    const showError = !!errorMessage && errorMessage.length > 0

    const [isOpened, setIsOpened] = useState(false)

    const classNames = {
      root: clsx(s.root, className),
      inputContainer: s.inputContainer,
      input: clsx(s.input, textFieldStyles.inputField, showError && s.error, isRange && s.range),
      calendar: s.calendar,
      popper: s.popper,
      errorText: s.errorText,
    }

    const DatePickerHandler = (dates: [Date | null, Date | null] | Date) => {
      if (Array.isArray(dates)) {
        const [start, end] = dates

        setStartDate(start)
        setEndDate?.(end)
      } else {
        setStartDate(dates)
      }
    }

    const handleCalendarOpen = () => {
      setIsOpened(true)
    }
    const handleCalendarClose = () => {
      setIsOpened(false)
    }

    return (
      <div className={classNames.root} {...rest}>
        <RDPC
          startDate={startDate}
          endDate={endDate}
          onChange={DatePickerHandler}
          selected={startDate}
          selectsRange={isRange}
          formatWeekDay={formatWeekDay}
          placeholderText={placeholder}
          renderCustomHeader={params => <CustomHeader years={years} {...params} />}
          customInput={
            <CustomInput
              isOpened={isOpened}
              error={errorMessage}
              disabled={disabled}
              label={label}
            />
          }
          closeOnScroll
          onCalendarClose={handleCalendarClose}
          onCalendarOpen={handleCalendarOpen}
          calendarClassName={classNames.calendar}
          className={classNames.input}
          popperClassName={classNames.popper}
          dayClassName={() => s.day || ''}
          dateFormat="dd/MM/yyyy"
          showPopperArrow={false}
          calendarStartDay={1}
          disabled={disabled}
          popperPlacement="auto-start"
          popperModifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 36],
              },
            },
          ]}
        />
        <div className={s.errorContainer}>
          {showError && (
            <div style={{ display: 'flex' }}>
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </div>
    )
  }
)

type CustomInputProps = {
  disabled?: boolean
  label?: string
  error?: string
  isOpened: boolean
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, error, disabled, isOpened, ...rest }, ref) => {
    const classNames = {
      inputContainer: clsx(s.inputContainer, error && s.error),
      icon: clsx(s.icon, disabled && s.disabled),
    }

    return (
      <Label className={s.label} label={label}>
        <div className={classNames.inputContainer}>
          <input ref={ref} disabled={disabled} {...rest} />
          <div className={clsx(classNames.icon, error && s.errorText)}>
            {isOpened ? <CalendarIcon /> : <CalendarOutline />}
          </div>
        </div>
      </Label>
    )
  }
)
