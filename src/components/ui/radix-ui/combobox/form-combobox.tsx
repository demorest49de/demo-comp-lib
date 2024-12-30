import {} from 'react'
import {
  Control, FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form'
import { ComboBox } from '@/components/ui/radix-ui/combobox/combobox'

export type ComboboxFormFields<T extends FieldValues> = {
  options: string[]
  parentClassName?: string
  control: Control<T>
  name: FieldPath<T>
  setValue: (value: string | null) => void
  handleListOpen: (value: boolean) => void
}

export const FormCombobox = <T extends FieldValues>({
  control,
  name,
  options,
  parentClassName,
  setValue,
  handleListOpen,
}: ComboboxFormFields<T>) => {
  const {
    formState: { errors },
    field: { ref, name: fieldName, onChange, value },
  } = useController({
    control,
    name,
  })

  return (
    <ComboBox
      options={options}
      parentClassName={parentClassName}
      name={fieldName}
      error={errors?.country?.message?.toString()}
      ref={ref}
      value={value}
      onChange={onChange}
      setValue={setValue}
      handleListOpen={handleListOpen}
    />
  )
}
