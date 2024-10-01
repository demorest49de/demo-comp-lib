import { Meta, StoryObj } from '@storybook/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../button/button'
import { FormCheckbox } from './form-checkbox'
import { ReactNode } from 'react'

const FakeForm = ({ name, children }: { name: string; children: ReactNode }) => {
  const FormSchema = z.object({
    [name]: z.literal(true, {
      errorMap: () => ({ message: 'Please, mark the checkbox, if you agree to our terms' }),
    }),
  })
  type FormValues = z.infer<typeof FormSchema>

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  })

  const handleSubmitHandler = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitHandler)}>
      <FormCheckbox control={control} labelText={'Agree to terms'} name={name}>
        {children}
      </FormCheckbox>
      <Button>Submit</Button>
    </form>
  )
}

const meta = {
  component: FakeForm,
  tags: ['autodocs'],
  title: 'Form/FormCheckbox',
} satisfies Meta<typeof FakeForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'terms_agreement',
    children: <span>Check-box</span>,
  },
}
