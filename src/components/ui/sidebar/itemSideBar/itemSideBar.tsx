import React from 'react'
import clsx from 'clsx'
import s from './itemSideBar.module.scss'

type Props = {
  disabled?: boolean
  Icon: React.ElementType
  item: string
}
export const ItemSideBar = ({ disabled, Icon, item }: Props) => {
  const disabledClasses = disabled ? s.TagDisabled : ''
  return (
    <div className={clsx(s.Tag, disabledClasses)}>
      <Icon aria-hidden="true" className={s.Svg} />
      <a href="#" onClick={e => {e.preventDefault()}} className={s.A}>{item}</a>
    </div>
  )
}
