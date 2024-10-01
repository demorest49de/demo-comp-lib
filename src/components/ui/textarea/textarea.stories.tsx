import { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './textarea'
import { Button } from '../button/button'
import React, { useRef, useState } from 'react'

const meta = {
  component: Textarea,
  title: 'Components/Textarea',
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const ErrorOutputInArea: Story = {
  args: {
    error: 'Error text',
    titleLabel: 'enter message',
  },
  render: args => {
    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Textarea titleLabel={args.titleLabel} error={args.error} />
      </div>
    )
  },
}
export const DisabledTextArea: Story = {
  args: {
    disabled: true,
    titleLabel: 'enter message',
  },
  render: args => {
    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Textarea titleLabel={args.titleLabel} disabled={args.disabled} />
      </div>
    )
  },
}

export const ControlTextArea: Story = {
  args: {
    titleLabel: 'enter message',
  },
  render: args => {
    const [message, setMessage] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const handleSaveMessage = () => {
      if (textareaRef.current) {
        setMessage(textareaRef.current.value)
        textareaRef.current.value = ''
      }
    }

    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Textarea ref={textareaRef} titleLabel={args.titleLabel} />
        <Button onClick={handleSaveMessage} style={{ marginTop: '10px' }}>
          Save message
        </Button>
        <p>{message}</p>
      </div>
    )
  },
}
