import { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'
import { action } from '@storybook/addon-actions'
import { FlagRussia } from '../../../assets/components'
import React from 'react'

const meta = {
  component: Button,
  title: 'Components/Button',
  tags: ['autodocs'],
  args: { onClick: action('button clicked') },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
}

export const FullWidth: Story = {
  args: {
    ...Primary.args,
    fullWidth: true,
    children: 'Full Width',
  },
  render: args => {
    return (
      <Button {...args} onClick={() => alert('clicked nice button')}>
        Nice button
      </Button>
    )
  },
}

export const AsLink: Story = {
  args: {
    ...Primary.args,
    asChild: true,
    children: <a href={'#'}>Link</a>,
  },
}

export const WithIcone: Story = {
  args: {
    children: (
      <>
        <FlagRussia /> Delete
      </>
    ),
    disabled: false,
    variant: 'primary',
  },
}
