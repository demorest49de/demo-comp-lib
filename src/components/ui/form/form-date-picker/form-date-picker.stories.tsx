import type { Meta, StoryObj } from '@storybook/react'

import { useForm } from 'react-hook-form'

import { FormDatePicker } from './form-date-picker'
import { Button } from '../../button/button'
import { range } from '../../../../lib/range'
import { getYear } from 'date-fns'

const FakeForm = () => {
  type FormValues = {
    date: Date | null
  }
  const years = range(1940, getYear(new Date()) + 1)
  const { control, handleSubmit } = useForm<FormValues>()

  const handleSubmitHandler = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitHandler)}>
      <FormDatePicker
        years={years}
        control={control}
        label={'Pick date'}
        name={'date'}
        rules={{ required: 'Date is required' }}
        markedAsRequired
      />
      <Button>Submit</Button>
    </form>
  )
}

const meta = {
  component: FakeForm,
  tags: ['autodocs'],
  title: 'Form/FormDatePicker',
} satisfies Meta<typeof FakeForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

// export const WithRange: Story = {
//   args: {
//     label: 'Pick range date',
//     name: 'dateRange',
//   },
//
//   render: () => {
//     type FormValues = {
//       dateRange: [Date, null]
//     }
//     const { control, handleSubmit } = useForm<FormValues>()
//     const [startDate] = useState<any>(new Date())
//     const [endDate, setEndDate] = useState<Date | null>(
//       startDate ? new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000) : null
//     )
//
//     const handleSubmitHandler = (data: FormValues) => {
//       console.log(data)
//     }
//
//     return (
//       <form onSubmit={handleSubmit(handleSubmitHandler)}>
//         <FormDatePicker
//           label={'Pick range date'}
//           control={control}
//           name={'dateRange'}
//           defaultValue={startDate}
//           endDate={endDate}
//           setEndDate={setEndDate}
//           rules={{ required: 'Date is required' }}
//         />
//         <Button>Submit</Button>
//       </form>
//     )
//   },
// }
