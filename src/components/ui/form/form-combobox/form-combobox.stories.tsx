import type {Meta, StoryObj} from '@storybook/react'

import {useForm} from 'react-hook-form'

import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {FormCombobox} from './form-combobox'
import {useState} from "react";
import {optionType} from "../../combobox/combobox.stories";
import {ComboboxOptionProps} from "../../combobox";
import {Button} from "../../button/button";

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

const options2: optionType[] = [
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

const FakeForm = () => {

    const [valueCountry, setValueCountry] = useState<string | null>(null)

    const [valueCity, setValueCity] = useState<string | null>(null)


    const [dataForCountry, setGetDataForCountry]
        = useState<ComboboxOptionProps<string> | null>(null)
    console.log(' dataForCountry: ', dataForCountry);

    const [dataForCity, setGetDataForCity]
        = useState<ComboboxOptionProps<string> | null>(null)
    console.log(' dataForCity: ', dataForCity);

    const FormSchema = z.object({
        country: z.string({message: 'This field is required'}),
        city: z.string({message: 'This field is required'}),
    })
    type FormValues = z.infer<typeof FormSchema>

    const {control, handleSubmit, clearErrors} = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {},
    })

    const handleSubmitHandler = (data: FormValues) => {
        console.log(data)
    }

    const h2Styles: React.CSSProperties = {textAlign: 'center'}
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
                    getDataForCombobox={setGetDataForCountry}
                />
                <FormCombobox
                    control={control}
                    name={'city'}
                    value={valueCity}
                    options={options2}
                    setValue={setValueCity}
                    onInputClick={() => {
                    }}
                    getDataForCombobox={setGetDataForCity}
                />
                <Button>submit</Button>
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
