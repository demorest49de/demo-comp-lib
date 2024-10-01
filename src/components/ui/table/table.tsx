import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from './table.module.scss'

/**
 *
 * @Root - начало и конец таблицы.
 * @Head - заголовок таблицы
 * @Body - тело таблицы
 * @Row - определяет строку таблицы "строка"
 * @HeaderCell - определяет заголовок столбца или строки таблицы "столбец для хедера, ячейка  для хедера"
 * @Cell - содержимое ячейки таблицы "столбец, ячейка"
 */

const Root = ({ className, ...restProps }: ComponentPropsWithoutRef<'table'>) => {
  const classes = clsx(s.root, className)

  return <table className={classes} {...restProps} />
}
const Head = ({ className, ...restProps }: ComponentPropsWithoutRef<'thead'>) => {
  const classes = clsx(s.head, className)

  return <thead className={classes} {...restProps} />
}
const Body = ({ className, ...restProps }: ComponentPropsWithoutRef<'tbody'>) => {
  const classes = clsx(s.body, className)

  return <tbody className={classes} {...restProps} />
}
const Row = ({ className, ...restProps }: ComponentPropsWithoutRef<'tr'>) => {
  const classes = clsx(s.row, className)

  return <tr className={classes} {...restProps} />
}
const HeaderCell = ({
  className,
  isSorting = false,
  ...restProps
}: ComponentPropsWithoutRef<'th'> & { isSorting?: boolean }) => {
  const classes = clsx(s.headerCell, isSorting && s.headerCellSorting, className)

  return <th className={classes} {...restProps} />
}
const Cell = ({ className, ...restProps }: ComponentPropsWithoutRef<'td'>) => {
  const classes = clsx(s.cell, className)

  return <td className={classes} {...restProps} />
}
const Empty = ({ className, ...restProps }: ComponentPropsWithoutRef<'span'>) => {
  const classes = clsx(s.empty, className)

  return <span {...restProps} className={classes} />
}

export const Table = { Body, Cell, Empty, Head, HeaderCell, Root, Row }
