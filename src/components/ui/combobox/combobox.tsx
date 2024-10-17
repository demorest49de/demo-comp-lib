import {
  ChangeEvent,
  Dispatch,
  Fragment,
  ReactNode,
  SetStateAction,
  forwardRef,
  useMemo,
  useState,
  useRef,
  RefObject,
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
import { css } from '@emotion/react'
import styled from '@emotion/styled'

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

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps<string, FieldValues>>(
  (
    {
      name,
      options,
      onChange,
      getDataForCombobox,
      onInputClick,
      placeholder,
      isAsync,
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

    const [position, setPosition] = useState(false)

    const useUniqueItems = (items: ComboboxOptionProps<string>[]) => {
      return useMemo(() => {
        const uniqueKeys = new Set()
        return items.filter(item => {
          const keyValue = item.label
          if (!uniqueKeys.has(keyValue)) {
            uniqueKeys.add(keyValue)
            return true
          }
          return false
        })
      }, [items])
    }

    const handleClearButtonClicked = () => {
      setValue(name, null)
      onChange(null)
      // console.log(' blur: ')
      inputRef?.current?.blur()
      // inputRef?.current?.focus()
    }

    const uniqueItems = useUniqueItems(options)

    function filterOptions(uniqueItems: ComboboxOptionProps<string>[]) {
      const filteredOptions =
        value && !isAsync
          ? uniqueItems.filter(option => option.label?.toLowerCase().includes(value?.toLowerCase()))
          : uniqueItems

      return filteredOptions.sort((a, b) => a.label.localeCompare(b.label))
    }

    const filteredOptions = filterOptions(uniqueItems)

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.currentTarget.value as string | ''
      setValue(name, newValue || null)

      const optionResult = filteredOptions?.find(option => option.value.name === newValue)
      getDataForCombobox(optionResult || null)

      if (newValue === '') {
        onChange(null)
      } else {
        onChange(newValue)
        setPosition(true)
      }
    }

    const getDisplayingValue = (optionValue: string) => {
      const optionResult = filteredOptions?.find(option => option.value.name === optionValue)
      return optionResult?.label || ''
    }

    const classNames = {
      box: clsx(s.box),
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

    const buttonStyle = css`
      width: ${position || value ? '35px' : '100%'};
      & div[id*='headlessui-combobox-button'] {
        //background-color: yellow;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: right;
        padding-right: 10px;
      }
    `
    const UpDownButton = styled.div`
      ${buttonStyle}
    `

    const itemHeight = 40
    const listHeight = Math.min(filteredOptions.length * itemHeight, 120)

    const inputRef = useRef<HTMLInputElement>()

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
              <ComboboxUI.Input
                className={classNames.input}
                displayValue={getDisplayingValue}
                onChange={inputChangeHandler}
                placeholder={placeholder}
                value={value || ''}
                disabled={disabled}
                onKeyDown={e => {
                  if (e.key === 'ArrowDown') {
                    console.log('Arrow down key pressed')
                    requestItemOnKeyDown && requestItemOnKeyDown()
                  }
                }}
                ref={inputRef as RefObject<HTMLInputElement>}
              />
              {isLoading && <ThreeDotsSpinner spinnerclassName={s.threeDotsSpinner} />}
              <UpDownButton className={classNames.button}>
                <ComboboxUI.Button as={'div'} className={s.buttonAsDiv}>
                  <ArrowIosDownOutline className={classNames.icon} />
                </ComboboxUI.Button>
              </UpDownButton>
            </Label>
            {isClearButtonVisible && (
              // <div >
                <ComboboxUI.Button
                    className={classNames.clearButton}
                  as={'div'}
                  onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                    console.log(`111`)
                    console.log(event.currentTarget)
                    handleClearButtonClicked()
                  }}
                >
                  <Close />
                </ComboboxUI.Button>
              // </div>
            )}
          </div>
          <ComboboxUI.Options as={'div'} className={classNames.content} transition>
            <ScrollAreaComponent>
              <List
                height={listHeight}
                itemCount={Math.min(filteredOptions.length, 40)}
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
