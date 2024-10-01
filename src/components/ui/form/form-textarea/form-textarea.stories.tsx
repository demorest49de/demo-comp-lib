import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormTextarea } from './form-textarea'
import { Button } from '../../button/button'
import React from 'react'
import { action } from '@storybook/addon-actions'

const FormSchema = z.object({
  aboutMe: z.string().max(200, { message: 'Maximum 200 characters allowed' }).optional(),
})
type FormValues = z.infer<typeof FormSchema>
const FakeForm = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      aboutMe: '',
    },
  })

  const handleSubmitHandler = (data: FormValues) => {
    console.log('Data: ', data)
  }

  return (
    <>
      <h2 style={{ margin: '10px 180px' }}>Form with Textarea</h2>
      <form onSubmit={handleSubmit(handleSubmitHandler)}>
        <FormTextarea
          control={control}
          name={'aboutMe'}
          titleLabel="About Me"
          placeholder="Enter something about yourself"
        />
        <Button onClick={action('textarea submitted')}>Submit</Button>
      </form>
    </>
  )
}

const meta = {
  component: FakeForm,
  tags: ['autodocs'],
  title: 'Form/FormTextarea',
} satisfies Meta<typeof FakeForm>

export default meta
type Story = StoryObj<typeof meta>

export const Form: Story = {
  args: {},
}
