import { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '../../../../lib/cn'
import { useState } from 'react'
import { FormCombobox, ListFieldProps } from './form-combobox'

const meta = {
  component: FormCombobox,
} satisfies Meta<typeof FormCombobox>

export default meta

type Story = StoryObj<typeof meta>
// const options = ['Apricot', 'Apple', 'Grapes', 'Pineapple', 'Grapefruit']
// const options = [
//   'Apricot',
//   'Apple',
//   'Grapes',
//   'Pineapple',
//   'Grapefruit',
//   'Apricot',
//   'Apple',
//   'Pineapple',
//   'Grapefruit',
//   'Apricot',
//   'Apple',
//   'Pineapple',
//   'Grapefruit',
//   'Apricot',
//   'Apple',
//   'Pineapple',
//   'Grapefruit',
//   'Apricot',
//   'Apple',
//   'Pineapple',
//   'Grapefruit',
//   'Apricot',
//   'Apple',
//   'Pineapple',
//   'Grapefruit',
//   'Apricot',
//   'Apple',
//   'Pineapple',
//   'Grapefruit',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
//   'Apple',
// ]
const options: ListFieldProps[] = [
  { label: 'Apricot', value: { name: 'Apricot', id: 1 } },
  { label: 'Apple', value: { name: 'Apple', id: 2 } },
  { label: 'Grapes', value: { name: 'Grapes', id: 3 } },
  { label: 'Pineapple', value: { name: 'Pineapple', id: 4 } },
  { label: 'Grapefruit', value: { name: 'Grapefruit', id: 5 } },
]



const FormSchema = z.object({
  country: z
    .string()
    .nullable()
    .refine(val => val !== null, 'This field is required')
    .refine(val => options.some(value => value.label === (val as string)), {
      message: 'This value must be one of the available options',
    }),
})

export type FormTypes = z.infer<typeof FormSchema>

export const Primary = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  args: {
    options: options,
  },
  render: args => {
    const [listOpen, setListOpen] = useState<boolean>(false)
    const { setValue, handleSubmit, control } = useForm<FormTypes>({
      resolver: zodResolver(FormSchema),
    })

    const onSubmit = handleSubmit(data => {
      console.log('submit data: ', data)
    })

    const handleListOpen = (isOpen: boolean) => {
      setListOpen(isOpen)
    }

    const { options } = args
    return (
      <div className={`h-screen grid place-items-center `}>
        <div className={`text-center`}>
          <div className={`p-2`}>select element 1 and element 2</div>
          <form
            onSubmit={onSubmit}
            className={`flex flex-col text-center items-center`}
          >
            <FormCombobox
              options={options}
              name={'country'}
              control={control}
              setValue={value => setValue('country', value)}
              handleListOpen={value => handleListOpen(value ?? false)}

              // onInputClick={() => {}}
              // getDataForCombobox={setGetDataForCountry}
              // isLoading={false}
              // markedAsRequired
            />
            <FormCombobox
              options={options}
              name={'country'}
              control={control}
              setValue={value => setValue('country', value)}
              handleListOpen={value => handleListOpen(value ?? false)}

              // onInputClick={() => {}}
              // getDataForCombobox={setGetDataForCity}
              // disabled={!countryValue}
              // isLoading={false}
              // markedAsRequired
              /*
                requestItemOnKeyDown={() => {
                  if (!arrowDownPressed) {
                    handleClickInputCity()
                    setArrowDownPressed(true)
                  }
                }}
                 */
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
