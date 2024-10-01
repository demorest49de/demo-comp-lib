import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import s from '../date-picker.module.scss'
import { enUS } from 'date-fns/locale'
import { format, getYear } from 'date-fns'
import { ArrowIosBack, ArrowIosForward } from '@/assets/components'
import { capitalizeFirstLetter } from '@/lib/capitalizeFirstLetter'
import { range } from '@/lib/range'
import { Select, SelectItem } from '@/components/ui'

export const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  changeYear,
  years,
}: ReactDatePickerCustomHeaderProps & { years: number[] }) => {
  const classNames = {
    header: s.header,
    buttonBox: s.buttonBox,
    button: s.button,
  }
  const headerText = capitalizeFirstLetter(format(date, 'LLLL y', { locale: enUS }))

  return (
    <div className={classNames.header}>
      <div className={s.headerHeader}>
        <Select
          value={getYear(date).toString()}
          portal={false}
          onValueChange={value => {
            changeYear(+value)
          }}
        >
          {years.map(year => {
            return (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            )
          })}
        </Select>
      </div>
      <div className={s.headerFooter}>
        <span>{headerText}</span>
        <div className={classNames.buttonBox}>
          <button className={classNames.button} type="button" onClick={decreaseMonth}>
            <ArrowIosBack />
          </button>

          <button className={classNames.button} onClick={increaseMonth}>
            <ArrowIosForward />
          </button>
        </div>
      </div>
    </div>
  )
}
