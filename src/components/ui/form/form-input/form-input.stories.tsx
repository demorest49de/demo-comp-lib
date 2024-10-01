import type { Meta, StoryObj } from '@storybook/react'

import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput } from './form-input'
import { Button } from '../../button/button'

const FakeForm = () => {
  const FormSchema = z.object({
    email: z.string({ message: 'This field is required' }).email({ message: 'Not valid email' }),
    password: z.string({ message: 'This field is required' }).min(4, 'Password too short'),
  })
  type FormValues = z.infer<typeof FormSchema>

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  })

  const handleSubmitHandler = (data: FormValues) => {
    console.log(data)
  }

  return (
    <>
      <h2 style={{ margin: '10px 180px' }}>Form</h2>
      <form onSubmit={handleSubmit(handleSubmitHandler)}>
        <FormInput control={control} label={'Email'} name={'email'} />
        <FormInput control={control} label={'Password'} name={'password'} type={'password'} />
        <Button>Submit</Button>
      </form>
    </>
  )
}

const meta = {
  component: FakeForm,
  tags: ['autodocs'],
  title: 'Form/FormInput',
} satisfies Meta<typeof FakeForm>

export default meta
type Story = StoryObj<typeof meta>

export const Form: Story = {
  args: {},
}
