import type {Meta, StoryObj} from '@storybook/react'

import {useForm} from 'react-hook-form'

import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {FormCombobox} from './form-combobox'
import {useState} from "react";

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

const options2 = [
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

const FakeForm = () => {

    const [valueCountry, setValueCountry] = useState<string | null>(null)

    const [valueCity, setValueCity] = useState<string | null>(null)

    const FormSchema = z.object({
        country: z.string({message: 'This field is required'}),
        city: z.string({message: 'This field is required'}),
    })
    type FormValues = z.infer<typeof FormSchema>

    const {control, handleSubmit} = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {},
    })

    const handleSubmitHandler = (data: FormValues) => {
        console.log(data)
    }

    const h2Styles: React.CSSProperties =  {textAlign: 'center'}
    const formStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        gap: "10px"
    };

    return (
        <>
            <h2 style={h2Styles}>Form</h2>
            <form style={formStyles} onSubmit={handleSubmit(handleSubmitHandler)}>

                <FormCombobox
                    control={control}
                    name={'country'}
                    value={valueCountry}
                    options={options}
                    setValue={setValueCountry}
                    onInputClick={() => {
                    }}
                />
                <FormCombobox
                    control={control}
                    name={'city'}
                    value={valueCity}
                    options={options2}
                    setValue={setValueCity}
                    onInputClick={() => {
                    }}
                />
            </form>
        </>
    )
}

const meta = {
    component: FakeForm,
    tags: ['autodocs'],
    title: 'Form/FormCombobox',
} satisfies Meta<typeof FakeForm>

export default meta
type Story = StoryObj<typeof meta>

export const Form: Story = {
    args: {},
}
