import { Control, FieldValues, Path, useController, UseControllerProps } from 'react-hook-form'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Combobox, ComboboxOptionProps } from '@/components/ui/combobox'
export type FormComboboxProps<TFieldValues extends FieldValues, T> = {
    control: Control<TFieldValues>
    name: Path<TFieldValues>
    options: ComboboxOptionProps<T>[]
    // value?: T | null
    // setValue: (value: T | null) => void
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
    showClearButton?: boolean
}

export const FormCombobox = <TFieldValues extends FieldValues, T extends string>({
                                                                                     control,
                                                                                     name,
                                                                                     options,
                                                                                     // value,
                                                                                     // setValue,
                                                                                     onInputClick,
                                                                                     fullWidth = true,
                                                                                     rules,
                                                                                     shouldUnregister,
                                                                                     disabled,
                                                                                     getDataForCombobox,
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
    console.log('fieldValue', fieldValue)

    const fullWidthStyle = { width: '100%' }

    return (
        <div style={fullWidth ? fullWidthStyle : {}}>
            <Combobox
                name={name}
                options={options}
                // value={fieldValue ?? value ?? ("" as T | null)}
                // setValue={newValue => {
                //     onChange(newValue) // Обновляем значение через useController
                //     setValue(newValue) // Обновляем локальное значение
                // }}
                onChange={onChange}
                onInputClick={onInputClick}
                getDataForCombobox={getDataForCombobox}
                errorMessage={error?.message}
                {...comboboxProps}
                onBlur={onBlur} // Добавляем onBlur для корректной работы с валидацией
                ref={ref} // Добавляем ref для интеграции с react-hook-form
                value={fieldValue}
            />
        </div>
    )
}