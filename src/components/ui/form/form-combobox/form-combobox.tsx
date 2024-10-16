import { Control, FieldValues, Path, useController, UseControllerProps } from 'react-hook-form'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Combobox, ComboboxOptionProps } from '@/components/ui/combobox'

export type FormComboboxProps<TFieldValues extends FieldValues, T> = {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  options: ComboboxOptionProps<T>[]
  onInputClick: () => void
  getDataForCombobox: Dispatch<SetStateAction<ComboboxOptionProps<T> | null>>
  fullWidth?: boolean
  inputValue?: string
  onInputChange?: (value: string) => void
  rules?: UseControllerProps<TFieldValues>['rules']
  shouldUnregister?: boolean
  onClear?: () => void
  placeholder?: string
  isAsync?: boolean
  isLoading?: boolean
  disabled?: boolean
  errorMessage?: string
  label?: ReactNode
  portal?: boolean
  setValue: (name: keyof TFieldValues, value: T | string | null) => void
  requestItemOnKeyDown?: () => void
}

export const FormCombobox = <TFieldValues extends FieldValues, T extends string>({
  control,
  name,
  options,
  onInputClick,
  fullWidth = true,
  setValue,
  rules,
  shouldUnregister,
  disabled,
  getDataForCombobox,
  isLoading,
  requestItemOnKeyDown,
  ...comboboxProps
}: FormComboboxProps<TFieldValues, T>) => {
  const {
    field: { onChange, onBlur, ref, value: fieldValue },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
    shouldUnregister,
    disabled,
  })

  const fullWidthStyle = { width: '100%' }

  return (
    <div style={fullWidth ? fullWidthStyle : {}}>
      <Combobox
        name={name}
        options={options}
        onChange={onChange}
        onInputClick={onInputClick}
        getDataForCombobox={getDataForCombobox}
        errorMessage={error?.message}
        {...comboboxProps}
        onBlur={onBlur}
        ref={ref}
        value={fieldValue}
        disabled={disabled}
        setValue={setValue}
        isLoading={isLoading}
        requestItemOnKeyDown={requestItemOnKeyDown}
      />
    </div>
  )
}
