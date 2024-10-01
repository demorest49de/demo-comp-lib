import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode, useId } from 'react'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import * as RadixLabel from '@radix-ui/react-label'
import CheckmarkOutline from '../../../assets/components/CheckmarkOutline'
import s from './checkbox.module.scss'
import clsx from 'clsx'

type RadixCheckboxProps = typeof RadixCheckbox.Root
export type CheckboxProps = {
  id?: string
  checked?: boolean
  className?: string
  disabled?: boolean
  errorMsg?: string
  children?: ReactNode
} & ComponentPropsWithoutRef<RadixCheckboxProps>

export const Checkbox = forwardRef<ElementRef<RadixCheckboxProps>, CheckboxProps>(
  ({ id, checked, errorMsg, className, disabled, children, ...rest }, ref) => {
    const generatedId = useId()
    const finalId = id ? id : generatedId

    let shadow = s.shadowEnabled
    let noHover = undefined
    let noFocus = undefined
    let labelDisabled = undefined

    switch (true) {
      case disabled:
        shadow = undefined
        noHover = s.checkboxShadowNoHover
        noFocus = s.checkboxShadowNoFocus
        labelDisabled = s.checkboxLabelDisabled
        break
      case checked:
        shadow = s.shadowEnabled
        break
      case !checked:
        shadow = undefined
        break
      default:
        shadow = undefined
    }
    return (
      <div>
        <div className={clsx(s.checkboxContainer)}>
          <div className={clsx(s.checkboxShadow, shadow, noHover, noFocus, className)}>
            <RadixCheckbox.Root
              id={finalId}
              className={clsx(
                s.checkboxRoot,
                checked ? '' : s.checkboxUnchecked,
                errorMsg && s.error
              )}
              checked={checked}
              ref={ref}
              disabled={disabled}
              onCheckedChange={rest.onCheckedChange}
            >
              <RadixCheckbox.Indicator className={clsx(s.checkboxIndicator)}>
                <CheckmarkOutline />
              </RadixCheckbox.Indicator>
            </RadixCheckbox.Root>
          </div>
          <RadixLabel.Root htmlFor={finalId} className={clsx(s.checkboxLabel, labelDisabled)}>
            {children}
          </RadixLabel.Root>
        </div>
        <div className={clsx(s.errorMsg, errorMsg && s.show)}>{errorMsg}</div>
      </div>
    )
  }
)
