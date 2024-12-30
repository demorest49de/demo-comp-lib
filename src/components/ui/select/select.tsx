'use client'

import * as React from 'react'
import { ComponentPropsWithoutRef, ReactNode } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

import s from './select.module.scss'
import { ChevronDown } from '@/assets/components/chevron-down'
import { cn } from '@/lib/utils'

const Select = ({
  children,
  placeholder,
  triggerProps = {},
  triggerIcon,
  portal = true,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & {
  className?: string
  placeholder?: string
  triggerIcon?: ReactNode
  portal?: boolean
  triggerProps?: Omit<ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>, 'children'>
}) => (
  <SelectPrimitive.Root {...props}>
    <SelectTrigger {...triggerProps}>
      <div className={s.triggerLabel}>
        {triggerIcon && triggerIcon}
        <SelectValue placeholder={placeholder} />
      </div>
    </SelectTrigger>
    <SelectContent className={className} portal={portal}>
      {children}
    </SelectContent>
  </SelectPrimitive.Root>
)

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm  placeholder:text-muted-foreground [&>span]:line-clamp-1',
      s.trigger,
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className={cn('h-4 w-4', s.triggerChevron)} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & { portal?: boolean }
>(({ className, children, position = 'popper', portal, ...props }, ref) => (
  <>
    {portal ? (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          className={cn(
            'relative z-50 max-h-96 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-t-0',
            position === 'popper' &&
              'data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1',
            s.content,
            className
          )}
          position={position}
          {...props}
        >
          <SelectPrimitive.Viewport
            className={cn(
              s.viewport,
              position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full'
            )}
          >
            {children}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    ) : (
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          'relative z-50 max-h-96 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-t-0',
          position === 'popper' &&
            'data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1',
          s.content,
          className
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            s.viewport,
            position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full'
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    )}
  </>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground',
      s.item,
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem }
