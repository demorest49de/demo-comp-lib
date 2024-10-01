import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import s from '@/components/ui/radio-group/radioGroup.module.scss'
import { Root } from '@radix-ui/react-radio-group'
import { RadioGroupItem } from './radio-group-item/radioGroupItem'
import clsx from 'clsx'

export type Option = {
  value: string | number
  label: string
}

type RadixRadioGroupProps = ComponentPropsWithoutRef<typeof Root>

export type RadioGroupProps = {
  value?: string
  onValueChange?: (value: string) => void
  options: Option[]
  defaultValue?: string
  className?: string
  errorMsg?: string
} & RadixRadioGroupProps

export const RadioGroup = forwardRef<ElementRef<typeof Root>, RadioGroupProps>(({ options, onValueChange, value, defaultValue, errorMsg, ...rest }, ref) => {
    const renderedRadioGroup = options.map((option: Option) => {
      return (
        <RadioGroupItem title={option.label} disabled={rest.disabled} key={option.value} />
      )
    })
    return (
      <div className={s.wrapper}>
        <Root
          ref={ref}
          className={clsx(s.RadioGroupRoot, rest.className)}
          defaultValue={defaultValue ? defaultValue : value}
          aria-label="View density"
          value={value}
          onValueChange={onValueChange}
          disabled={rest.disabled}
        >
          {renderedRadioGroup}
        </Root>
        <div className={clsx(s.errorMsg, errorMsg && s.show)}>{errorMsg}</div>
      </div>
    )
  },
)