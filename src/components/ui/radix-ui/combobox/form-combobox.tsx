import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import { ComboBox } from '@/components/ui/radix-ui/combobox/combobox'

export type OptionsType = {
  label: string
  value: { id: number; name: string }
}

export type ComboboxFormFields<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  options: OptionsType[]
  parentClassName?: string
  setValue: (value: string | null) => void
  /**
   * If u have button closer to combobox underspace u may wonder
   * why is the button visible through the elems list.
   * So handleListOpen useState is used in parent comp to manage z-index of,
   * for exampe, submit button. You can use tailwind llike this: !listOpen ? `z-[1]` : `z-[0]`
   * @param {boolean} value - boolean state from parent element useState .
   * @returns {void} void
   */
  handleListOpen?: (value: boolean) => void
  dataForComboboxHandler: (instance: OptionsType) => void
  onInputClick: () => void
}

export const FormCombobox = <T extends FieldValues>({
  control,
  name,
  options,
  parentClassName,
  setValue,
  handleListOpen,
  dataForComboboxHandler,
  onInputClick,
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
      dataForComboboxHandler={dataForComboboxHandler}
      onInputClick={onInputClick}
    />
  )
}
