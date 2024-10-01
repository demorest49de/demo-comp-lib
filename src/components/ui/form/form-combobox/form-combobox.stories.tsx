import type {Meta, StoryObj} from '@storybook/react'

import {useForm} from 'react-hook-form'

import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {FormCombobox} from './form-combobox'
import {Button} from "../../button/button"
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

    const [valueCountry, setValueCountry] = useState<string | number | null>(null)
    const [inputValueCountry, setInputValueCountry] = useState('')

    const [valueCity, setValueCity] = useState<string | number | null>(null)
    const [inputValueCity, setInputValueCity] = useState('')

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

    return (
        <>
            <h2 style={{margin: '10px 180px'}}>Form</h2>
            <form onSubmit={handleSubmit(handleSubmitHandler)}>
                <FormCombobox
                    value={valueCountry}
                    inputValue={inputValueCountry} control={control} name={'country'} options={options} onChange={setValueCountry}
                              onInputChange={setInputValueCountry}/>
                <FormCombobox value={valueCity} inputValue={inputValueCity} control={control} name={'city'} options={options2} onChange={setValueCity}
                              onInputChange={setInputValueCity}/>
                <Button>Submit</Button>
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
