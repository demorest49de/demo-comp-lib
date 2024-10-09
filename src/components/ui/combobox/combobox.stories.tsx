import {useState} from 'react'
import {Meta} from '@storybook/react'
import {Combobox, ComboboxOptionProps, ComboboxProps} from "./combobox";
import {FieldValues} from "react-hook-form";

export type optionType = {
    label: string
    value: { id: number, name: string }
}

const options: optionType[] = [
    {
        label: 'Apple',
        value: {
            id: 1,
            name: 'apple',
        }
    },
    {
        label: 'Banana',
        value: {
            name: 'banana',
            id: 2
        }
    },
    {
        label: 'Blueberry',
        value: {
            name: 'blueberry',
            id: 3
        }
    },
]

export default {
    component: Combobox,
    title: 'Components/Combobox',
} satisfies Meta<typeof Combobox>

export const Simple = {
    args: {
        name: 'country',
        label: 'Select country',
        options,
    },

    render: (args: ComboboxProps<string, FieldValues>) => {

        const [value, setValue] = useState<string | null>(null)
        const [valueForCity, setValueForCity]
            = useState<ComboboxOptionProps<string> | null>(null)


        return (
            <>
                <div>
                    <Combobox
                        {...args}
                        value={value || ""}
                        setValue={setValue}
                        getDataForCombobox={setValueForCity}
                        onInputClick={() => {

                        }}
                    />
                </div>
                <div>Selected value: {value}</div>
            </>
        )
    },
}

export const SimpleWithLabelDisabled = {
    ...Simple,
    args: {
        ...Simple.args,
        label: 'Some label',
        disabled: true
    },
}

export const WithError = {
    ...Simple,
    args: {
        ...Simple.args,
        errorMessage: 'Сообщение об ошибке',
    },
}
