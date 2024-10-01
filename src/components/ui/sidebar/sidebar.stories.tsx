import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './sidebar'
import {
  Home,
  LogOut,
  Search,
  PlusSquareOutline,
  Person,
  MessageCircleOutline,
} from '../../../assets/components'
import { ItemSideBar } from './itemSideBar/itemSideBar'

const TAGS = Array.from({ length: 100 }).map((_, i, a) => `My Items.${a.length - i}`)

const meta = {
  component: Sidebar,
  title: 'Components/Sidebar',
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>


export const SidebarScroll: Story = {
  args: {
    children: TAGS.map(tag => <ItemSideBar Icon={Home} item="Page home" key={tag} />),
  },
}

export const SidebarItemDisabled: Story = {
  args: {},
  render: () => {
    return (
      <Sidebar>
        <ItemSideBar Icon={Home} item="Home" disabled />
        <ItemSideBar Icon={Search} item="Search" />
        <ItemSideBar Icon={LogOut} item="Logout" />
        <ItemSideBar Icon={PlusSquareOutline} item="Create" />
        <ItemSideBar Icon={Person} item="Profile" />
        <ItemSideBar Icon={MessageCircleOutline} item="Message" />
      </Sidebar>
    )
  },
}

export const SidebarDefault: Story = {
  args: {},
  render: () => {
    return (
      <Sidebar>
        <ItemSideBar Icon={Home} item="Home" />
        <ItemSideBar Icon={Search} item="Search" />
        <ItemSideBar Icon={LogOut} item="Logout" />
        <ItemSideBar Icon={PlusSquareOutline} item="Create" />
        <ItemSideBar Icon={Person} item="Profile" />
        <ItemSideBar Icon={MessageCircleOutline} item="Message" />
        <div style={{ marginTop: '60px' }}>
          <ItemSideBar Icon={PlusSquareOutline} item="Create" />
          <ItemSideBar Icon={Person} item="Profile" />
        </div>
        <div style={{ marginTop: '150px' }}>
          <ItemSideBar Icon={LogOut} item="Logout" />
        </div>
      </Sidebar>
    )
  },
}
