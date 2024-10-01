import { Meta, StoryObj } from '@storybook/react'
import { Card } from './card'

const meta = {
  component: Card,
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <div>
          <h1>Hello World</h1>
          <p>How are you?</p>
        </div>
      </>
    ),
  },
}

export const AsArticle: Story = {
  args: {
    as: 'article',
    children: (
      <>
        <div>
          <h1>Hello World</h1>
          <p>How are you?</p>
        </div>
      </>
    ),
  },
}

export const AsSection: Story = {
  args: {
    as: 'section',
    children: (
      <>
        <div>
          <h1>Hello World</h1>
          <p>How are you?</p>
        </div>
      </>
    ),
  },
}
