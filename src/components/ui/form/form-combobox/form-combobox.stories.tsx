import { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '../../../../lib/cn'
import { useEffect, useState } from 'react'
import { FormCombobox, OptionsType } from './form-combobox'

const meta = {
  component: FormCombobox,
  tags: ['autodocs'],
  title: 'Form/FormCombobox',
} satisfies Meta<typeof FormCombobox>

export default meta

type Story = StoryObj<typeof meta>

const countries: OptionsType[] = [
  { label: 'USA', value: { name: 'USA', id: 1 } },
  { label: 'Canada', value: { name: 'Canada', id: 2 } },
  { label: 'Australia', value: { name: 'Australia', id: 3 } },
  { label: 'Germany', value: { name: 'Germany', id: 4 } },
  { label: 'France', value: { name: 'France', id: 5 } },
  { label: 'Ukraine', value: { name: 'Ukraine', id: 6 } },
]

const cities: OptionsType[] = [
  { label: 'New York', value: { name: 'New York', id: 1 } },
  { label: 'Los Angeles', value: { name: 'Los Angeles', id: 1 } },
  { label: 'Toronto', value: { name: 'Toronto', id: 2 } },
  { label: 'Vancouver', value: { name: 'Vancouver', id: 2 } },
  { label: 'Sydney', value: { name: 'Sydney', id: 3 } },
  { label: 'Melbourne', value: { name: 'Melbourne', id: 3 } },
  { label: 'Berlin', value: { name: 'Berlin', id: 4 } },
  { label: 'Munich', value: { name: 'Munich', id: 4 } },
  { label: 'Paris', value: { name: 'Paris', id: 5 } },
  { label: 'Lyon', value: { name: 'Lyon', id: 5 } },
]

const FormSchema = z.object({
  country: z
    .string()
    .nullable()
    .refine(val => val !== null, 'This field is required')
    .refine(val => countries.some(value => value.label === (val as string)), {
      message: 'This value must be one of the available options',
    }),
  city: z
    .string()
    .nullable()
    .refine(val => val !== null, 'This field is required')
    .refine(val => cities.some(value => value.label === (val as string)), {
      message: 'This value must be one of the available options',
    }),
})

export type FormTypes = z.infer<typeof FormSchema>

export const Primary = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  args: {},
  render: () => {
    const [listOpen, setListOpen] = useState<boolean>(false)
    const { setValue, handleSubmit, control, watch, reset } =
      useForm<FormTypes>({
        resolver: zodResolver(FormSchema),
      })

    const countryValue = watch('country')
    // eslint-disable-next-line
    const [selectedCountry, setSelectedCountry] = useState<OptionsType | null>(
      null
    )
    // eslint-disable-next-line
    const [selectedCity, setSelectedCity] = useState<OptionsType | null>(null)

    const [currCities, setCurrCities] = useState<OptionsType[] | null>(null)
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
      if (!countryValue) {
        setDisabled(true)
        setCurrCities(null)
        setValue('city', null)
      } else if (countryValue === selectedCountry?.label) {
        const values = cities.filter(
          item => item.value.id === selectedCountry?.value.id
        )
        setCurrCities(values)
        setDisabled(false)
      }
    }, [countryValue, selectedCountry])

    useEffect(() => {
      reset({
        country: null,
        city: null,
      })
    }, [])

    // console.log(' selectedCountry: ', selectedCountry)
    // console.log(' selectedCity: ', selectedCity)

    const onSubmit = handleSubmit(data => {
      console.log('submit data: ', data)
    })

    const handleListOpen = (isOpen: boolean) => {
      setListOpen(isOpen)
    }

    return (
      <div className={`h-screen grid place-items-center `}>
        <div className={`text-center`}>
          <div className={`p-2`}>select element 1 and element 2</div>
          <form
            onSubmit={onSubmit}
            className={`flex flex-col text-center items-center`}
          >
            <FormCombobox
              options={countries}
              name={'country'}
              control={control}
              setValue={value => setValue('country', value)}
              handleListOpen={value => handleListOpen(value ?? false)}
              dataForComboboxHandler={(instance: OptionsType) =>
                setSelectedCountry(instance as OptionsType)
              }
              onInputClick={() => {}}
              isLoading={false}
              markedAsRequired
            />
            <FormCombobox
              control={control}
              dataForComboboxHandler={(instance: OptionsType) =>
                setSelectedCity(instance as OptionsType)
              }
              options={currCities as OptionsType[]}
              name={'city'}
              setValue={value => setValue('city', value)}
              handleListOpen={value => handleListOpen(value ?? false)}
              disabled={disabled}
              onInputClick={() => {}}
              isLoading={false}
              markedAsRequired
            />
            <button
              className={cn(
                `cursor-pointer z-[1] p-1.5 rounded border-solid border-2 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-50 `,
                !listOpen ? `z-[1]` : `z-[0]`
              )}
            >
              submit
            </button>
          </form>
        </div>
      </div>
    )
  },
} satisfies Story
