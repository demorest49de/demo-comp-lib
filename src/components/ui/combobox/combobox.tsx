//region imports
import {
  ChangeEvent,
  Dispatch,
  Fragment,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  forwardRef,
} from 'react'
import { Combobox as ComboboxUI } from '@headlessui/react'
import { Close, ArrowIosDownOutline } from '../../../assets/components'
import { ScrollAreaComponent } from '../../ui/scroll/scrollArea'
import { Label } from '../label'
import { Float } from '@headlessui-float/react'
import { clsx } from 'clsx'
import selectStyle from './select.module.scss'
import s from './combobox.module.scss'
import { FixedSizeList as List } from 'react-window'
import { FieldValues, Path } from 'react-hook-form'
import { ThreeDotsSpinner } from '@/components/ui/three-dots-spinner/three-dots-spinner'

export type ComboboxOptionProps<T> = {
  label: T
  value: { id: number; name: string }
}

export type ComboboxProps<T, TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>
  options: ComboboxOptionProps<T>[]
  onInputClick: () => void
  onChange: (value: T | null) => void
  setValue: (name: Path<TFieldValues>, value: string | null) => void
  getDataForCombobox: Dispatch<SetStateAction<ComboboxOptionProps<T | any> | null>>

  placeholder?: string
  isAsync?: boolean
  isLoading?: boolean
  disabled?: boolean
  errorMessage?: string
  label?: ReactNode
  portal?: boolean
  value: string
  onBlur?: () => void
  requestItemOnKeyDown?: () => void
}
//endregion imports
export const Combobox = forwardRef<HTMLInputElement, ComboboxProps<string, FieldValues>>(
  (
    {
      name,
      options,
      onChange,
      getDataForCombobox,
      onInputClick,
      placeholder,
      isLoading,
      errorMessage,
      label,
      portal = true,
      value,
      disabled,
      setValue,
      requestItemOnKeyDown,
      ...comboboxProps
    },
    ref
  ) => {
    const showError = !!errorMessage && errorMessage.length > 0
    const isClearButtonVisible = !!value

    //region functionality
    const handleClearButtonClicked: MouseEventHandler<HTMLDivElement> = () => {
      setValue(name, null)
      onChange(null)
    }

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.currentTarget.value as string | ''
      setValue(name, newValue || null)

      if (newValue === '') {
        onChange(null)
      } else {
        onChange(newValue)
      }
    }

    const getDisplayingValue = (optionValue: string) => {
      const optionResult = options?.find(option => option.value.name === optionValue)
      getDataForCombobox(optionResult || null)
      return optionResult?.label || ''
    }

    function filterOptions() {
      const filtered = value
        ? options.filter(option => option.label?.toLowerCase().includes(value?.toLowerCase()))
        : options
      return filtered.sort((a, b) => a.label.localeCompare(b.label))
    }

    const filteredOptions = filterOptions()

    const classNames = {
      box: s.box,
      button: clsx(s.button),
      clearButton: s.clearButton,
      content: clsx(selectStyle.content, filteredOptions.length === 0 && s.empty),
      icon: clsx(s.icon),
      input: clsx(s.input, showError && s.error),
      errorMessage: clsx(showError && s.errorMessage),
      item: selectStyle.item,
      optionsBlock: selectStyle.optionsBlock,
      root: s.root,
      spinnerParentDiv: s.spinnerParentDiv,
      label: s.label,
    }

    const itemHeight = 40
    const listHeight = Math.min(filteredOptions.length * itemHeight, 200)

    //endregion functionality

    return (
      <ComboboxUI
        {...{ disabled, name, onChange }}
        {...comboboxProps}
        as={'div'}
        className={classNames.root}
      >
        <Float adaptiveWidth as={'div'} floatingAs={Fragment} placement={'bottom'} portal={portal}>
          <div className={classNames.box}>
            <Label label={label} className={classNames.label}>
              <ComboboxUI.Button as={'div'} className={s.buttonAsDiv}>
                <ComboboxUI.Input
                  className={classNames.input}
                  displayValue={getDisplayingValue}
                  onChange={inputChangeHandler}
                  placeholder={placeholder}
                  onClick={onInputClick}
                  value={value || ''}
                  disabled={disabled}
                  //todo исправить
                  onDoubleClick={e => {
                    const input = e.currentTarget
                    input.select()
                  }}
                  onKeyDown={e => {
                    if (e.key === 'ArrowDown') {
                      console.log('Arrow down key pressed')
                      requestItemOnKeyDown && requestItemOnKeyDown()
                    }
                  }}
                  ref={ref}
                />
                {isLoading && <ThreeDotsSpinner spinnerclassName={s.threeDotsSpinner} />}
                <div className={classNames.button}>
                  <ArrowIosDownOutline className={classNames.icon} />
                </div>
              </ComboboxUI.Button>
            </Label>
            {isClearButtonVisible && (
              <div className={classNames.clearButton} onClick={handleClearButtonClicked}>
                <Close />
              </div>
            )}
          </div>
          <ComboboxUI.Options as={'div'} className={classNames.content} transition>
            <ScrollAreaComponent>
              <List
                height={listHeight}
                itemCount={filteredOptions.length}
                itemSize={itemHeight}
                width="100%"
              >
                {({ index, style }) => {
                  const option = filteredOptions[index]
                  return (
                    <ComboboxUI.Option
                      as={'button'}
                      className={classNames.item}
                      key={option?.value.id}
                      type={'button'}
                      value={option?.value.name}
                      style={style}
                      onClick={() => onChange(option?.label as string)}
                    >
                      <span>{option?.label}</span>
                    </ComboboxUI.Option>
                  )
                }}
              </List>
            </ScrollAreaComponent>
          </ComboboxUI.Options>
        </Float>
        {showError && <span className={s.errorMessage}>{errorMessage}</span>}
      </ComboboxUI>
    )
  }
)
