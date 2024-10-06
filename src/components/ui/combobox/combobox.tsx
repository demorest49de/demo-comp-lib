import {ChangeEvent, Fragment, MouseEventHandler, ReactNode, useState} from 'react'

import {Close, ArrowIosDownOutline} from '../../../assets/components'
import {ScrollAreaComponent} from '../../ui/scroll/scrollArea'
import {Spinner} from "../spinner/spinner"
import {Label} from '../label'
import {Combobox as ComboboxHeadlessUI} from '@headlessui/react'
import {Float} from '@headlessui-float/react'
import {clsx} from 'clsx'

import selectStyle from './select.module.scss'
import s from './combobox.module.scss'

export type ComboboxOptionProps<T = string> = {
    label: T
    value: T
}

export type ComboboxProps<T> = {

    name: string
    options: ComboboxOptionProps<T>[]
    value: T | null
    setValue: (value: T | null) => void
    onInputClick: () =>  void

    //todo необязательные + удалить ненужные
    inputValue?: string
    onInputChange?: (value: string) => void

    // todo функция для выбора новой опции: нужна если опция была уже выбрана
    onClear?: () => void
    placeholder?: string


    isAsync?: boolean
    isLoading?: boolean
    disabled?: boolean
    errorMessage?: string
    label?: ReactNode
    portal?: boolean
    showClearButton?: boolean
}

export const Combobox = <T extends string>({
                                                        name,
                                                        options,
                                                        value,
                                                        setValue: onChange,
                                                        onInputClick,
                                                        onClear,
                                                        placeholder,
                                                        isAsync,
                                                        isLoading,
                                                        disabled = false,
                                                        errorMessage,
                                                        label,
                                                        portal = true,
                                                        showClearButton = true,
                                                    }: ComboboxProps<T>) => {

    const [inputValue, setInputValue] = useState('')
    const showError = !!errorMessage && errorMessage.length > 0
    const isClearButtonVisible = showClearButton && !!value

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(' e.currentTarget.value: ', e.currentTarget.value);
        if (e.currentTarget.value === '') {
            onChange(null)
        }
        setInputValue(e.currentTarget.value)
    }

    const handleClearButtonClicked: MouseEventHandler<HTMLDivElement> = () => {
        setInputValue('')
        onChange(null)
    }

    const filteredOptions =
        inputValue === '' && !isAsync
            ? options
            : options.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()))

    const classNames = {
        box: s.box,
        button: clsx(s.button),
        clearButton: s.clearButton,
        content: clsx(selectStyle.content, filteredOptions.length === 0 && s.empty),
        icon: clsx(s.icon),
        input: clsx(
            s.input,
            showError && s.error,
        ),
        errorMessage: clsx(showError && s.errorMessage),
        item: selectStyle.item,
        optionsBlock: selectStyle.optionsBlock,
        root: s.root,
        spinner: s.spinner,
        label: s.label,
    }

    const getDisplayingValue = (value: string) =>
        options?.find(option => option.value === value)?.label || ''

    return (
        <ComboboxHeadlessUI
            {
                ...{
                    disabled,
                    name,
                    onChange,
                    value,
                }
            }
            as={'div'}
            className={classNames.root}
        >

            <Float adaptiveWidth as={'div'} floatingAs={Fragment} placement={'bottom'} portal={portal}>
                <div className={classNames.box}>
                    <Label label={label} className={classNames.label}>
                        <ComboboxHeadlessUI.Button as={'div'}>

                            <ComboboxHeadlessUI.Input
                                className={classNames.input}
                                displayValue={getDisplayingValue}
                                onChange={inputChangeHandler}
                                placeholder={placeholder}
                                onClick={onInputClick}
                            />

                            <div className={classNames.button}>
                                <ArrowIosDownOutline className={classNames.icon}/>
                            </div>
                            {isLoading && (
                                <div className={classNames.spinner}>
                                    <Spinner className={""}/>
                                </div>
                            )}
                        </ComboboxHeadlessUI.Button>
                    </Label>
                    {isClearButtonVisible && (
                        <div className={classNames.clearButton} onClick={onClear ?? handleClearButtonClicked}>
                            <Close/>
                        </div>
                    )}
                </div>

                <ComboboxHeadlessUI.Options as={'div'} className={classNames.content}>
                    <ScrollAreaComponent>
                        <div className={classNames.optionsBlock}>{
                            filteredOptions.map(option => (
                                <ComboboxHeadlessUI.Option
                                    as={'button'}
                                    className={classNames.item}
                                    key={option.value}
                                    type={'button'}
                                    value={option.value}
                                >
                                    <span>{option.label}</span>
                                </ComboboxHeadlessUI.Option>
                            ))}
                        </div>
                    </ScrollAreaComponent>
                </ComboboxHeadlessUI.Options>
            </Float>
            <>{showError && <span className={s.errorMessage}>{errorMessage}</span>}</>
        </ComboboxHeadlessUI>
    )
}