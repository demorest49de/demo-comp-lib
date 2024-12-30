import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as LabelRadixUI from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './label.module.scss'
import styles from "@/components/ui/input/input.module.scss";

type LabelProps = {
  label?: ReactNode
  markedAsRequired?: boolean
} & ComponentPropsWithoutRef<'label'>

export const Label = ({ label, children, className, markedAsRequired = false, ...rest }: LabelProps) => {
  const classNames = {
    label: clsx(s.label, className),
  }

  return (
    <LabelRadixUI.Root {...rest}>
      {label && <div className={classNames.label}>{label}{markedAsRequired ? (<span className={styles.markedAsRequired}>*</span>) : ('')}</div>}
      {children}
    </LabelRadixUI.Root>
  )
}
