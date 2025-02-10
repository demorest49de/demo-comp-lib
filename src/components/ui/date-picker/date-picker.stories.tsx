import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { DatePicker } from './index'
import { range } from '../../../lib/range'
import { getYear } from 'date-fns'

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/UehOuThHVruUR8jcC22FXS/Inctagram?node-id=301-4850&node-type=canvas&t=EWfhrR0vsQ2RonSw-0',
    },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())
    const years = range(1940, getYear(new Date()) + 1)

    return (
      <>
        <DatePicker years={years} setStartDate={setStartDate} startDate={startDate} />
      </>
    )
  },

  args: {
    setStartDate: () => {},
    startDate: null,
    years: range(1940, getYear(new Date()) + 1),
  },
}

export const Range: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())
    const years = range(1940, getYear(new Date()) + 1)

    const [endDate, setEndDate] = useState<Date | null>(
      startDate ? new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000) : null
    )

    return (
      <DatePicker
        years={years}
        setStartDate={setStartDate}
        startDate={startDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    )
  },

  args: {
    setStartDate: () => {},
    startDate: null,
    years: range(1940, getYear(new Date()) + 1),
  },
}

export const WithError: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())
    const years = range(1940, getYear(new Date()) + 1)
    return (
      <DatePicker
        years={years}
        setStartDate={setStartDate}
        startDate={startDate}
        errorMessage={'Please pick date'}
      />
    )
  },

  args: {
    setStartDate: () => {},
    startDate: null,
    years: range(1940, getYear(new Date()) + 1),
  },
}

export const Disabled: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())
    const years = range(1940, getYear(new Date()) + 1)
    return (
      <DatePicker years={years} setStartDate={setStartDate} startDate={startDate} disabled={true} />
    )
  },

  args: {
    setStartDate: () => {},
    startDate: null,
    years: range(1940, getYear(new Date()) + 1),
  },
}
