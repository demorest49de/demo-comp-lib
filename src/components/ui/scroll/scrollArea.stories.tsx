import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { ScrollAreaComponent } from './scrollArea'

const meta = {
  component: ScrollAreaComponent,
  title: 'Components/ScrollArea',
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollAreaComponent>

export default meta

type Story = StoryObj<typeof meta>

export const DefaultScrollbar: Story = {
  args: {
    children: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, autem, beatae debitis,
        earum maiores nam omnis perspiciatis quas quasi ratione tenetur voluptas voluptatem!
        Blanditiis ducimus, excepturi iste iure quos veritatis. Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Adipisci, autem, beatae debitis, earum maiores nam omnis
        perspiciatis quas quasi ratione tenetur voluptas voluptatem! Blanditiis ducimus, excepturi
        iste iure quos veritatis. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Adipisci, autem, beatae debitis, earum maiores nam omnis perspiciatis quas quasi ratione
        tenetur voluptas voluptatem! Blanditiis ducimus, excepturi iste iure quos veritatis.
      </p>
    ),
  },
}

export const HorizontalScrollbar: Story = {
  args: {
    styles: {
      width: '400px',
      height: '170px',
    },
    children: (
      <div style={{ width: '1000px', height: '150px' }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, autem, beatae debitis,
          earum maiores nam omnis perspiciatis quas quasi ratione tenetur voluptas voluptatem!
          Blanditiis ducimus, excepturi iste iure quos veritatis. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Adipisci, autem, beatae debitis, earum maiores nam omnis
          perspiciatis quas quasi ratione tenetur voluptas voluptatem! Blanditiis ducimus, excepturi
          iste iure quos veritatis. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Adipisci, autem, beatae debitis, earum maiores nam omnis perspiciatis quas quasi ratione
          tenetur voluptas voluptatem! Blanditiis ducimus, excepturi iste iure quos veritatis.
        </p>
      </div>
    ),
  },
}

export const VerticalScrollbar: Story = {
  args: {
    styles: {
      width: '400px',
      height: '170px',
    },
    children: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, autem, beatae debitis,
        earum maiores nam omnis perspiciatis quas quasi ratione tenetur voluptas voluptatem!
        Blanditiis ducimus, excepturi iste iure quos veritatis. Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Adipisci, autem, beatae debitis, earum maiores nam omnis
        perspiciatis quas quasi ratione tenetur voluptas voluptatem! Blanditiis ducimus, excepturi
        iste iure quos veritatis. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Adipisci, autem, beatae debitis, earum maiores nam omnis perspiciatis quas quasi ratione
        tenetur voluptas voluptatem! Blanditiis ducimus, excepturi iste iure quos veritatis.
      </p>
    ),
  },
}
