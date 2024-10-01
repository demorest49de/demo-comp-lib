import { Meta, StoryObj } from '@storybook/react'
import { Recaptcha, RecaptchaProps } from './recaptcha'
import { action } from '@storybook/addon-actions'
import { useState } from 'react'

type FakeRecaptcha = {
  variant: RecaptchaProps['variant']
  onClick?: () => void
}

const FakeRecaptcha = (props: FakeRecaptcha) => {
  const { variant, onClick } = props

  const [recaptchaVariant, setRecaptchaVariant] = useState(variant)

  const handleOnClick = () => {
    setRecaptchaVariant('loading')
    setTimeout(() => {
      setRecaptchaVariant('checked')
    }, 1500)
  }

  return <Recaptcha variant={recaptchaVariant} onClick={onClick ?? handleOnClick} />
}

const meta = {
  component: FakeRecaptcha,
  title: 'Components/Recaptcha',
} satisfies Meta<typeof FakeRecaptcha>

export default meta

type Story = StoryObj<typeof meta>

export const Initial: Story = {
  args: { variant: 'initial', onClick: action('Button clicked') },
}

export const Checked: Story = {
  args: { variant: 'checked', onClick: action('Button clicked') },
}

export const Loading: Story = {
  args: { variant: 'loading', onClick: action('Button clicked') },
}

export const Expired: Story = {
  args: { variant: 'expired', onClick: action('Button clicked') },
}

export const WithError: Story = {
  args: { variant: 'withError', onClick: action('Button clicked') },
}

export const SuccessfulFlow: Story = {
  args: {
    variant: 'initial',
  },
}
