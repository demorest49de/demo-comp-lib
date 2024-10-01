import * as ScrollArea from '@radix-ui/react-scroll-area'
import clsx from 'clsx'
import s from './scrollArea.module.scss'

type ScrollAreaProps = {
  children: React.ReactNode
  styles?: React.CSSProperties
}

export const ScrollAreaComponent = ({ children, styles }: ScrollAreaProps) => {
  return (
    <ScrollArea.Root className={clsx(s.ScrollAreaRoot)} style={styles}>
      <ScrollArea.Viewport className={s.ScrollAreaViewport}>{children}</ScrollArea.Viewport>
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
