import {
  Control, FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form'
import { ComboBox } from '@/components/ui/radix-ui/combobox/combobox'

export type ComboboxFormFields<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  options: string[]
  parentClassName?: string
  setValue: (value: string | null) => void
  /**
   * If u have button closer to combobox underspace u may wonder
   * why is the button visible through the elems list.
   * So this useState is used in parent comp to manage z-index of,
   * for exampe, submit button like this !listOpen ? `z-[1]` : `z-[0]
   * @param {boolean} value - boolean state from parent element useState .
   * @returns {void} void
   */
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
