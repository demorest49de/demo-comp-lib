import {useState} from 'react'

import {Meta} from '@storybook/react'
import {Combobox, ComboboxProps} from "./combobox";

const options = [
    {
        label: 'Apple',
        value: 'apple',
    },
    {
        label: 'Banana',
        value: 'banana',
    },
    {
        label: 'Blueberry',
        value: 'blueberry',
    },
    {
        label: 'Grapes',
        value: 'grapes',
    },
    {
        label: 'Pineapple',
        value: 'pineapple',
    },
    {
        label: 'Cherry',
        value: 'cherry',
    },
    {
        label: 'Grapefruit',
        value: 'grapefruit',
    },
    {
        label: 'Lemon',
        value: 'lemon',
    },
    {
        label: 'Mango',
        value: 'mango',
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
