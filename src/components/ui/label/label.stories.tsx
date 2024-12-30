import type { Meta, StoryObj } from '@storybook/react'

import { Label } from './index'
import { useState } from 'react'

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Label',
    children: <input />,
  },
}

export const ControlledInputExample: Story = {
  args: {
    label: 'Controlled input example',
    children: <input />,
  },
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Label label={'Controlled input example'} markedAsRequired>
        <input value={value} onChange={e => setValue(e.currentTarget.value)} />
      </Label>
    )
  },
}
