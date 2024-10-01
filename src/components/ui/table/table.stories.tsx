import type { Meta, StoryObj } from '@storybook/react'

import { Table } from '.'

const meta = {
  component: Table.Root,
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof Table.Root>

export default meta
type Story = StoryObj<typeof meta>

export const TableDefault: Story = {
  args: {
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Date of Payment</Table.HeaderCell>
            <Table.HeaderCell>End date of subscription</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Subscription Type</Table.HeaderCell>
            <Table.HeaderCell>Payment Type</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>12.12.2022</Table.Cell>
            <Table.Cell>12.12.2022</Table.Cell>
            <Table.Cell>$100</Table.Cell>
            <Table.Cell>1 day</Table.Cell>
            <Table.Cell>Stripe</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>12.12.2022</Table.Cell>
            <Table.Cell>12.12.2022</Table.Cell>
            <Table.Cell>$100</Table.Cell>
            <Table.Cell>1 day</Table.Cell>
            <Table.Cell>Stripe</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>12.12.2022</Table.Cell>
            <Table.Cell>12.12.2022</Table.Cell>
            <Table.Cell>$100</Table.Cell>
            <Table.Cell>1 day</Table.Cell>
            <Table.Cell>Stripe</Table.Cell>
          </Table.Row>
        </Table.Body>
      </>
    ),
  },
}

export const TableAdmin: Story = {
  args: {
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>User ID</Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Profile link</Table.HeaderCell>
            <Table.HeaderCell>Date added</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>21331QErQe21</Table.Cell>
            <Table.Cell>Ivan Yakymenko</Table.Cell>
            <Table.Cell>Ivan.sr.yakimenko</Table.Cell>
            <Table.Cell>12.12.2022</Table.Cell>
            <Table.Cell>1</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>21331QErQe21</Table.Cell>
            <Table.Cell>Ivan Yakymenko</Table.Cell>
            <Table.Cell>Ivan.sr.yakimenko</Table.Cell>
            <Table.Cell>12.12.2022</Table.Cell>
            <Table.Cell>1</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>21331QErQe21</Table.Cell>
            <Table.Cell>Ivan Yakymenko</Table.Cell>
            <Table.Cell>Ivan.sr.yakimenko</Table.Cell>
            <Table.Cell>12.12.2022</Table.Cell>
            <Table.Cell>1</Table.Cell>
          </Table.Row>
        </Table.Body>
      </>
    ),
  },
}
export const Empty: Story = {
  args: {
    children: <Table.Empty>There is no data</Table.Empty>,
  },
}
