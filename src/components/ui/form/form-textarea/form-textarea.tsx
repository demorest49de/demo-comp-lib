import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { Textarea, Props as TextareaProps } from '@/components/ui/textarea/textarea'
import React from 'react'


export type FormTextareaProps<TFieldValues extends FieldValues> = Omit<
  TextareaProps,
  'id' | 'name' | 'onChange' | 'value'
> &
  Omit<UseControllerProps<TFieldValues>, 'control'> & {
    control: Control<TFieldValues>
  }

export const FormTextarea = <TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  shouldUnregister,
  disabled,
  defaultValue,
  ...textareaProps
}: FormTextareaProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
    shouldUnregister,
    disabled,
    defaultValue,
  })

  return (
    <Textarea
      {...textareaProps} 
      {...field} 
      error={error?.message}
      id={name} 
      value={field.value ?? ''} 
    />
  )
}
