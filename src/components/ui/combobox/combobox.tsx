import React, {
  useState,
  KeyboardEvent,
  useEffect,
  ChangeEvent,
  useId,
  forwardRef,
  useRef,
} from 'react'
import { ComponentPropsWithoutRef } from 'react'

import * as Popover from '@radix-ui/react-popover'
import { Button, Label } from '@/components/ui'
import Close from '@/assets/components/Close'
import ArrowIosDownOutline from '@/assets/components/ArrowIosDownOutline'
import { FixedSizeList, FixedSizeList as List } from 'react-window'
import { FieldPath, FieldValues } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { ThreeDotsSpinner } from '@/components/ui/three-dots-spinner/three-dots-spinner'
import {OptionsType} from "@/components/ui/form/form-combobox/form-combobox";

type InputPropsWithoutValue = Omit<ComponentPropsWithoutRef<'input'>, 'value'>
type ComboboxProps<T extends FieldValues> = InputPropsWithoutValue & {
  options: OptionsType[]
  parentClassName?: string
  setValue: (value: string | null) => void
  name: FieldPath<T>
  error: string | undefined
  value: string | null
  onChange: (value: string | null) => void
  handleListOpen?: (value: boolean) => void
  dataForComboboxHandler: (instance: OptionsType) => void
  onInputClick: () => void
  isLoading: boolean
  markedAsRequired?: boolean
}

export const ComboBox = forwardRef<
    HTMLInputElement,
    ComboboxProps<FieldValues>
>(
    (
        {
          options,
          parentClassName,
          name,
          error,
          onChange,
          value,
          setValue,
          id,
          handleListOpen,
          dataForComboboxHandler,
          onInputClick,
          isLoading,
          markedAsRequired,
          disabled,
          ...rest
        },
        ref
    ) => {
      // region code
      const [open, setOpen] = useState<boolean>(false)
      const [selectedIndex, setSelectedIndex] = useState<number>(-1)
      const [currentOptions, setCurrentOptions] = useState<OptionsType[]>(options)
      const [filterRequired, setFilterRequired] = useState<boolean>(false)

      const inputRef = useRef<HTMLInputElement | null>(null)
      const listElRef = useRef<FixedSizeList | null>(null)

      useEffect(() => {
        setCurrentOptions(options)
      }, [options])

      useEffect(() => {
        if (selectedIndex >= 0) {
          listElRef.current?.scrollToItem(selectedIndex)
        }
      }, [selectedIndex])

      useEffect(() => {
        if (!value) {
          setCurrentOptions(options)
          setSelectedIndex(-1)
        }
      }, [value])

      useEffect(() => {
        handleListOpen?.(open)
      }, [open])

      if (filterRequired) {
        filterOptions()
        setFilterRequired(false)
      }

      function filterOptions() {
        const filteredOptions = options.filter(item =>
            item.label
                ?.toLowerCase()
                .includes(value?.toString().toLowerCase() ?? '')
        )
        setCurrentOptions(filteredOptions)

        if (!value) {
          setSelectedIndex(-1)
        }
      }

      const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
          onInputClick()
          e.preventDefault()

          if (!open) {
            setOpen(true)
            return
          }
          setSelectedIndex(prevIndex => {
            if (prevIndex + 1 >= currentOptions.length) {
              return 0
            }
            return prevIndex + 1
          })
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()

          if (!open) {
            setOpen(true)
            return
          }

          setSelectedIndex(prevIndex => {
            if (prevIndex - 1 <= 0) {
              return 0
            }
            return prevIndex - 1
          })
        }
        if (e.key === 'Enter') {
          if (!open) {
            // get countries by pressing enter
            onInputClick()
          }
          e.preventDefault()
          const selectedOption = currentOptions[selectedIndex]
          if (selectedOption) {
            setValue(selectedOption.label)
            dataForComboboxHandler(selectedOption)
            onChange(selectedOption.label)
          } else if (
              currentOptions.length > 0 &&
              currentOptions[0]?.label
                  ?.toLowerCase()
                  .includes(value?.toString().toLowerCase() as string)
          ) {
            setValue(currentOptions[0]?.label)
            /*/
            onChange - responsible for activating validation
             */
            onChange(currentOptions[0]?.label)
            dataForComboboxHandler(currentOptions[0])
            setSelectedIndex(0)
          }
          setFilterRequired(true)
          setOpen(prevValue => !prevValue)
        }
        if (e.key === 'Escape') {
          e.preventDefault()
          open && setOpen(false)
        }
      }
      // console.log(' selectedIndex: ', selectedIndex)

      const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value

        setValue(value)

        if (value === '') {
          open && setOpen(false)
          setSelectedIndex(-1)
          onChange(null)
        } else {
          onChange(value)
        }
        !open && setOpen(true)
        setFilterRequired(true)
      }

      const generatedId = useId()
      const finalId = id ?? generatedId

      // endregion code
      return (
          <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
              <div
                  className={cn(
                      `relative w-[210px] h-[82px] mb-[51px] text-start`,
                      parentClassName
                  )}
                  onClick={e => {
                    if (disabled) {
                      e.preventDefault()
                    }
                  }}
              >
                <Label
                    htmlFor={finalId}
                    label={
                        (name?.charAt(0).toUpperCase() as string) +
                        (name?.slice(1) as string)
                    }
                    onClick={e => {
                      e.preventDefault()
                      if (disabled) {
                        return
                      }
                      setOpen(!open)
                    }}
                    className={cn(disabled && `disabled: cursor-red-close`)}
                    markedAsRequired={markedAsRequired}
                />

                <input
                    {...rest}
                    onClick={() => {
                      onInputClick()
                    }}
                    id={finalId}
                    ref={node => {
                      inputRef.current = node
                      if (typeof ref === 'function') {
                        ref(node)
                      } else if (ref) {
                        ref.current = node
                      }
                    }}
                    value={value || ''}
                    placeholder="Select an option..."
                    onChange={handleOnChange}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        `w-[210px] h-[36px] p-2 pr-[48px] cursor-text border-[1px] border-solid`,
                        `focus:border-theme-accent-500 outline-none`,
                        `rounded placeholder-light-900 text-light-100 bg-dark-500 `,
                        disabled && `disabled: cursor-red-close`,
                    )}
                    disabled={disabled}
                />
                <p className={cn(`text-red-500 text-sm`)}>{error}</p>
                {isLoading && <ThreeDotsSpinner top={'20px'} />}
                {
                  <Button
                      variant="ghost"
                      className={cn(
                          `!top-[35px] !right-[25px] !absolute !p-[1px] group !text-light-900 hover:!text-dark-100`,
                          disabled && `!hidden`
                      )}
                      onClick={e => {
                        e.preventDefault()
                        if (!value) {
                          setOpen(value => !value)
                          return
                        }
                        setValue(null)
                        onChange(null)
                        setOpen(false)
                        inputRef.current?.focus()
                      }}
                      disabled={disabled}
                  >
                    <Close
                        className={cn(
                            `!m-0`,
                            value
                                ? `opacity-100 transition-all duration-1000 visible`
                                : `opacity-0 transition-all duration-500 invisible`
                        )}
                    />
                  </Button>
                }
                <Button
                    onClick={e => {
                      e.preventDefault()
                      setOpen(value => !value)
                    }}
                    variant="ghost"
                    className={cn(
                        `!top-[35px] !right-[5px] !absolute !p-[1px] group !text-light-900 hover:!text-dark-100`,
                        disabled && `disabled: cursor-red-close`
                    )}
                    disabled={disabled}
                >
                  <ArrowIosDownOutline
                      className={cn(
                          `!m-0`,
                          open ? `rotate-180 duration-300` : 'duration-300'
                      )}
                  />
                </Button>
              </div>
            </Popover.Trigger>
            <Popover.Portal forceMount>
              <Popover.Content
                  className={cn(
                      open
                          ? `opacity-100 transition-all duration-500 visible `
                          : `opacity-0 transition-all duration-500 invisible`,
                      'bg-dark-500 text-light-100 border-[1px] border-solid border-[#ccc]',
                      `rounded w-[210px] max-h-[164px] overflow-y-auto relative`,
                      open ? `z-[1]` : `z-[0]`,
                      `absolute left-[-105px] top-[-22px]`
                  )}
                  onOpenAutoFocus={e => e.preventDefault()}
              >
                {currentOptions?.length > 0 ? (
                    <List
                        ref={listElRef}
                        height={
                          currentOptions.length < 4 ? 41 * currentOptions.length : 162
                        }
                        itemCount={currentOptions.length}
                        itemSize={41}
                        width={209}
                        className={cn(`custom-scrollbar `)}
                    >
                      {({ index, style }) => (
                          <div
                              onClick={() => {
                                setValue(currentOptions[index]?.label as string)
                                dataForComboboxHandler(currentOptions[index]!)
                                setOpen(false)
                                onChange(currentOptions[index]?.label as string)
                                setSelectedIndex(0)
                                setFilterRequired(true)
                              }}
                              className={cn(
                                  `hover:bg-dark-300 hover:text-theme-accent-500 p-[8px] h-[41px] cursor-pointer`,
                                  selectedIndex === index ? 'bg-dark-300 text-theme-accent-500' : '',
                              )}
                              style={style}
                          >
                            {currentOptions[index]?.label}
                          </div>
                      )}
                    </List>
                ) : (
                    <div style={{ padding: '8px', color: '#999' }}>
                      No options found
                    </div>
                )}
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
      )
    }
)
