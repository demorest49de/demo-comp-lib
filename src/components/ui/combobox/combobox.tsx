import {ChangeEvent, Fragment, MouseEventHandler, ReactNode} from 'react'

import {Close, ArrowIosDownOutline} from '../../../assets/components'
import {ScrollAreaComponent} from '../../ui/scroll/scrollArea'
import {Spinner} from "../spinner/spinner"
import {Label} from '../label'
import {Combobox as ComboboxHeadlessUI} from '@headlessui/react'
import {Float} from '@headlessui-float/react'
import {clsx} from 'clsx'

import selectStyle from './select.module.scss'
import s from './combobox.module.scss'

export type ComboboxOptionProps<T> = {
    label: string
    value: T
}

export type ComboboxProps<T> = {
    // todo ???
    isAsync?: boolean
    isLoading?: boolean

    // todo name для формы
    name?: string
    disabled?: boolean
    errorMessage?: string
    // todo уже сохраненное значение от пользователя (по-умолчанию передается "")
    inputValue: string
    label?: ReactNode

    // todo функция для выбора новой опции
    onChange: (value: T | null) => void
    onClear?: () => void
    onInputChange: (value: string) => void

    options: ComboboxOptionProps<T>[]
    placeholder?: string

    portal?: boolean
    showClearButton?: boolean
    value: T | null
}

export const Combobox = <T extends number | string>({
                                                        disabled = false,
                                                        errorMessage,
                                                        inputValue,
                                                        isAsync,
                                                        isLoading,
                                                        label,
                                                        name,
                                                        onChange,
                                                        onClear,
                                                        onInputChange,
                                                        options,
                                                        placeholder,
                                                        portal = true,
                                                        showClearButton = true,
                                                        value,
                                                    }: ComboboxProps<T>) => {


    const showError = !!errorMessage && errorMessage.length > 0
    const isClearButtonVisible = showClearButton && !!value

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(' e.currentTarget.value: ', e.currentTarget.value);
        if (e.currentTarget.value === '') {
            onChange(null)
        }
        onInputChange(e.currentTarget.value)
    }

    const handleClearButtonClicked: MouseEventHandler<HTMLDivElement> = () => {
        onInputChange('')
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

    const getDisplayingValue = (value: number | string) =>
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