import clsx from 'clsx'
import React, { ComponentPropsWithRef } from 'react'
import s from './sidebar.module.scss'
import * as ScrollArea from '@radix-ui/react-scroll-area'


type Props = {
	children?: React.ReactNode
	className?: string
} & ComponentPropsWithRef<typeof ScrollArea.Root>
export const Sidebar = ({ children, className }: Props) => {
  return (
    <ScrollArea.Root className={s.ScrollAreaRoot}>
      <ScrollArea.Viewport className={s.ScrollAreaViewport}>
        <div className={clsx(s.BlockForItems, className)}>
          {children}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className={s.ScrollAreaScrollbar} orientation="vertical">
        <ScrollArea.Thumb className={s.ScrollAreaThumb} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar className={s.ScrollAreaScrollbar} orientation="horizontal">
        <ScrollArea.Thumb className={s.ScrollAreaThumb} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className={s.ScrollAreaCorner} />
    </ScrollArea.Root>
  )
}
