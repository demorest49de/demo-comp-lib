import {Control, FieldValues, Path, useController, UseControllerProps} from 'react-hook-form'
import {ReactNode} from "react";
import {Combobox, ComboboxOptionProps} from "@/components/ui/combobox";

export type FormComboboxProps<TFieldValues extends FieldValues, T> = {
    control: Control<TFieldValues>,
    name: Path<TFieldValues>,
    rules?: UseControllerProps<TFieldValues>['rules']
    shouldUnregister?: boolean
    isAsync?: boolean
    isLoading?: boolean
    label?: ReactNode
    placeholder?: string
    options: ComboboxOptionProps<T>[]
    disabled?: boolean
    portal?: boolean
    showClearButton?: boolean
    inputValue: string
    onChange: (value: T | null) => void
    onInputChange: (value: string) => void
    value: T | null,
    onInputClick: () => void
}


export const FormCombobox = <TFieldValues extends FieldValues, T extends string | number>({
                                                                                              control,
                                                                                              value,
                                                                                              name,
                                                                                              rules,
                                                                                              shouldUnregister,
                                                                                              disabled,
                                                                                              inputValue,
                                                                                              onChange,
                                                                                              onInputChange,
                                                                                              options,
                                                                                              onInputClick,
                                                                                              ...comboboxProps
                                                                                          }: FormComboboxProps<TFieldValues, T>) => {
    const {
        field,
        fieldState: {error},
    } = useController({
        control,
        name,
        rules,
        shouldUnregister,
        disabled,
    })
    return (
        <Combobox
            {...
                {
                    inputValue,
                    onChange,
                    onInputChange,
                    name,
                    value,
                    options,
                    onInputClick,
                    ...comboboxProps,
                }
            }
        />
    )
}
