import { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './checkbox'
import { useRef, useState } from 'react'

const meta = {
  component: Checkbox,
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <span>Check-box</span>,
  },
  render: args => {
    const [checked, setChecked] = useState(false)
    const checkRef = useRef<HTMLButtonElement>(null)

    const handleCheckbox = () => {
      if (checkRef.current) {
        setChecked(!checked)
      }
    }
    return (
      <div>
        <Checkbox {...args} checked={checked} ref={checkRef} onCheckedChange={handleCheckbox} />
      </div>
    )
  },
}

export const Checked: Story = {
  args: {
    children: <span>Check-box</span>,
  },
  render: args => {
    const [checked, setChecked] = useState(true)
    const checkRef = useRef<HTMLButtonElement>(null)

    const handleCheckbox = () => {
      if (checkRef.current) {
        setChecked(!checked)
      }
    }
    return (
      <div>
        <Checkbox {...args} checked={checked} ref={checkRef} onCheckedChange={handleCheckbox} />
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    children: <span>Check-box</span>,
    disabled: true,
  },
  render: args => {
    const [checked, setChecked] = useState(true)
    const checkRef = useRef<HTMLButtonElement>(null)
    const handleCheckbox = () => {
      if (checkRef.current) {
        setChecked(!checked)
      }
    }
    return (
      <div>
        <Checkbox {...args} checked={checked} ref={checkRef} onCheckedChange={handleCheckbox} />
      </div>
    )
  },
}
