import React from 'react'

import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { RadioGroup, RadioGroupProps } from '@/components/ui'

type FormRadioGroup<T extends FieldValues> = Omit<UseControllerProps<T>, 'control' | 'rules'>
  & Omit<RadioGroupProps, 'value' | 'onValueChange' | 'onBlur' | 'onChange'>
  & { control: Control<T> }

export const FormRadioGroup = <T extends FieldValues>({
  control,
  name,
  shouldUnregister,
  disabled,
  defaultValue,
  ...rest
}: FormRadioGroup<T>) => {

  const {
    field: { value, onChange, ...otherFields },
    fieldState: { error },
  } = useController({ control, name, shouldUnregister, disabled, defaultValue })

  return (
    <RadioGroup value={value} onValueChange={onChange} errorMsg={error?.message} {...otherFields} {...rest} />
  )
}