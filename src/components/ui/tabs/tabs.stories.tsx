import { Meta, StoryObj } from '@storybook/react'
import { TabContent, Tabs } from './tabs'

const meta = {
  component: Tabs,
  title: 'Components/Tabs',
  tags: ['autodocs'],
  args: {
    tabs: [
      { title: 'General information', value: 'information' },
      { title: 'Devices', value: 'devices' },
      { title: 'Account Management', value: 'account' },
      { title: 'My payments', value: 'payments' },
    ],
    children: (
      <div
        style={{
          margin: '20px 0px',
          padding: '20px',
          height: '200px',
          border: '3px solid violet',
        }}
      >
        <TabContent value={'information'}>Content about General information</TabContent>
        <TabContent value={'devices'}>Content about Devices</TabContent>
        <TabContent value={'account'}>Content about Account Management</TabContent>
        <TabContent value={'payments'}>Content about My payments</TabContent>
      </div>
    ),
    defaultValue: 'information',
  },
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  name: 'Tabs default',
}

export const PrimaryDisabled: Story = {
  name: 'Tabs with disabled trigger',
  args: {
    tabs: [
      { title: 'General information', value: 'information' },
      { title: 'Devices', value: 'devices' },
      { title: 'Account Management', value: 'account' },
      { disabled: true, title: 'My payments', value: 'payments' },
    ],
  },
}

export const PrimaryFullwidth: Story = {
  name: 'Tabs with prop "fullwidth"',
  args: {
    fullWidth: true,
  },
}
