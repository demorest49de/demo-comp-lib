import React, { ComponentPropsWithoutRef, ElementType } from 'react'
import s from './card.module.scss'
import { clsx } from 'clsx'

export type CardProps<T extends ElementType = 'div'> = {
  as?: T
} & ComponentPropsWithoutRef<T>

export function Card<T extends ElementType = 'div'>(props: CardProps<T>) {
  const { as: Component = 'div', className, ...rest } = props

  return <Component className={clsx(s.cardsRoot, className)} {...rest} />
}
