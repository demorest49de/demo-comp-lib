import {useState} from 'react'
import {Meta} from '@storybook/react'
import {Combobox, ComboboxProps} from "./combobox";
import { v4 as uuidv4 } from 'uuid';

export type optionType = {
    value: string
    label: string
    id: string
}

const options: optionType[] = [
    {
        label: 'Apple',
        value: 'apple',
        id: uuidv4()
    },
    {
        label: 'Banana',
        value: 'banana',
        id: uuidv4()
    },
    {
        label: 'Blueberry',
        value: 'blueberry',
        id: uuidv4()
    },
    // {
    //     label: 'Grapes',
    //     value: 'grapes',
    // },
    // {
    //     label: 'Pineapple',
    //     value: 'pineapple',
    // },
    // {
    //     label: 'Cherry',
    //     value: 'cherry',
    // },
    // {
    //     label: 'Grapefruit',
    //     value: 'grapefruit',
    // },
    // {
    //     label: 'Lemon',
    //     value: 'lemon',
    // },
    // {
    //     label: 'Mango',
    //     value: 'mango',
    // },
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

    render: (args: ComboboxProps<string>) => {

        const [value, setValue] = useState<string | null>(null)


        return (
            <>
                <div>
                    <Combobox
                        {...args}
                        value={value}
                        setValue={setValue}
                        onInputClick={()=>{console.log('onInputClicked!')}}
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
