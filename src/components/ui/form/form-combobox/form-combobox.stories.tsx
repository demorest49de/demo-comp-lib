import type { Meta, StoryObj } from '@storybook/react'

import { useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormCombobox } from './form-combobox'
import { useEffect, useState } from 'react'
import { optionType } from '../../combobox/combobox.stories'
import { ComboboxOptionProps } from '../../combobox'
import { Button } from '../../button/button'

const options1: optionType[] = [
  {
    label: 'Apple',
    value: {
      id: 1,
      name: 'Apple',
    },
  },
  {
    label: 'Banana',
    value: {
      name: 'Banana',
      id: 2,
    },
  },
  {
    label: 'Blueberry',
    value: {
      name: 'Blueberry',
      id: 3,
    },
  },
]

const options2: optionType[] = [
  {
    label: 'Banana',
    value: {
      name: 'Banana',
      id: 2,
    },
  },
  {
    label: 'Blueberry',
    value: {
      name: 'Blueberry',
      id: 3,
    },
  },
  {
    label: 'Apple',
    value: {
      id: 1,
      name: 'Apple',
    },
  },
]

const FakeForm = () => {
  const [countriesValues, setCountriesValues] = useState<optionType[]>(options1)

  const [citiesValues, setCitiesValues] = useState<optionType[] | null>(options2)

  const [dataForCountry, setGetDataForCountry] = useState<ComboboxOptionProps<string> | null>(null)

  const [dataForCity, setGetDataForCity] = useState<ComboboxOptionProps<string> | null>(null)

  const FormSchema = z.object({
    country: z.string({ message: 'This field is required' }),
    city: z.string({ message: 'This field is required' }),
  })
  type FormValues = z.infer<typeof FormSchema>

  const { reset, setValue, control, handleSubmit, watch } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  })

  const countryValue = watch('country')

  useEffect(() => {
    if (!countryValue) {
      setValue('city', '') // Очистка значения city
      setCitiesValues(null) // Также очищаем список городов, если необходимо
    }
  }, [countryValue, setValue])

  useEffect(() => {
    reset({
      country: undefined,
      city: undefined,
    })
  }, [])

  const handleSubmitHandler = (data: FormValues) => {
    console.log(data)
  }

  function addRandnomValues() {
    options1.length = 0
    options2.length = 0
    // options1.push( { label: '0', value: { id: options1.length + 1, name: `0` } }, ...pusharrayhandler())
    options1.push(...pusharrayhandler())
    options1.unshift({ label: '0', value: { id: options1.length + 1, name: `0` } })
    options1.unshift({ label: '0', value: { id: options1.length + 1, name: `0` } })
    options1.unshift({ label: '0', value: { id: options1.length + 1, name: `0` } })
    options2.push(...pusharrayhandler())
  }

  addRandnomValues()

  function pusharrayhandler() {
    return new Array<optionType>(80)
      .fill({ label: '', value: { id: 0, name: '' } })
      .map((_, index) => {
        const guid = uuid()
        return { label: guid, value: { id: index, name: guid } }
      })
  }

  const h2Styles: React.CSSProperties = { textAlign: 'center' }
  const formStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  }

  return (
    <>
      <h2 style={h2Styles}>Form</h2>
      <form style={formStyles} onSubmit={handleSubmit(handleSubmitHandler)}>
        <FormCombobox
          control={control}
          name={'country'}
          options={options1}
          onInputClick={() => {}}
          getDataForCombobox={setGetDataForCountry}
          setValue={value => setValue('country', value)}
          isLoading={false}
        />
        <FormCombobox
          control={control}
          name={'city'}
          options={options2}
          onInputClick={() => {}}
          getDataForCombobox={setGetDataForCity}
          setValue={value => setValue('city', value)}
          disabled={!countryValue}
          isLoading={false}
        />
        <Button type={'submit'}>submit</Button>
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
