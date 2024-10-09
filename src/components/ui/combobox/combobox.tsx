import {
    ChangeEvent,
    Dispatch,
    FocusEventHandler,
    Fragment,
    MouseEventHandler,
    ReactNode,
    SetStateAction,
} from 'react'
import {Combobox as ComboboxUI} from '@headlessui/react'

import {Close, ArrowIosDownOutline} from '../../../assets/components'
import {ScrollAreaComponent} from '../../ui/scroll/scrollArea'
import {Spinner} from '../spinner/spinner'
import {Label} from '../label'
import {Float} from '@headlessui-float/react'
import {clsx} from 'clsx'

import selectStyle from './select.module.scss'
import s from './combobox.module.scss'

export type ComboboxOptionProps<T = string> = {
    label: T
    value: { id: number; name: string }
}

export type ComboboxProps<T, TFieldValues extends FieldValues> = {
    name: Path<TFieldValues>
    options: ComboboxOptionProps<T>[]
    onInputClick: () => void
    onChange: (value: T | null) => void
    setValue: (name: Path<TFieldValues>, value: string | null) => void;
    getDataForCombobox: Dispatch<SetStateAction<ComboboxOptionProps<T> | null>>

    placeholder?: string

    isAsync?: boolean
    isLoading?: boolean
    disabled?: boolean
    errorMessage?: string
    label?: ReactNode
    portal?: boolean
    value: string
}
import {FixedSizeList as List} from 'react-window'
import {FieldValues, Path} from "react-hook-form";


export const Combobox = <T extends string>({
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
                                               onBlur,
                                               ref,
                                               value,
                                               disabled,
                                               setValue,
                                               ...comboboxProps
                                           }: ComboboxProps<T, FieldValues> & {
    onBlur?: FocusEventHandler<HTMLInputElement>
    ref?: React.Ref<HTMLInputElement>
}) => {
    
    const showError = !!errorMessage && errorMessage.length > 0
    const isClearButtonVisible = !!value

    const handleClearButtonClicked: MouseEventHandler<HTMLDivElement> = () => {

        setValue(name, null)
        onChange(null)
    }

    const filteredOptions =
        value && !isAsync
            ? options.filter(option =>
                option.label?.toLowerCase().includes(value?.toLowerCase()))
            : options

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value as T | ''
        setValue(name, newValue || null)

        if (newValue === '') {
            onChange(null)
        } else {
            onChange(newValue as T)
        }
    }

    const getDisplayingValue = (optionValue: string) => {
        const optionResult = options?.find(option => option.value.name === optionValue)
        getDataForCombobox(optionResult || null)
        return optionResult?.label || ''
    }

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
        spinner: s.spinner,
        label: s.label,
    }

    // Определяем высоту одного элемента списка
    const itemHeight = 40
    // Устанавливаем высоту окна, чтобы было видно, например, 5 элементов
    const listHeight = Math.min(filteredOptions.length * itemHeight, 200)


    return (
        <ComboboxUI
            {...{disabled, name, onChange}}
            {...comboboxProps}
            as={'div'}
            className={classNames.root}
        >
            <Float adaptiveWidth as={'div'} floatingAs={Fragment} placement={'bottom'} portal={portal}>
                <div className={classNames.box}>
                    <Label label={label} className={classNames.label}>
                        <ComboboxUI.Button as={'div'}>
                            <ComboboxUI.Input
                                className={classNames.input}
                                displayValue={getDisplayingValue}
                                onChange={inputChangeHandler}
                                placeholder={placeholder}
                                onClick={onInputClick}
                                onBlur={onBlur}
                                value={value || ""}
                                disabled={disabled}
                                ref={ref}
                            />
                            <div className={classNames.button}>
                                <ArrowIosDownOutline className={classNames.icon}/>
                            </div>
                            {isLoading && (
                                <div className={classNames.spinner}>
                                    <Spinner/>
                                </div>
                            )}
                        </ComboboxUI.Button>
                    </Label>
                    {isClearButtonVisible && (
                        <div className={classNames.clearButton} onClick={handleClearButtonClicked}>
                            <Close/>
                        </div>
                    )}
                </div>
                <ComboboxUI.Options as={'div'} className={classNames.content}>
                    <ScrollAreaComponent>
                        <List
                            height={listHeight}
                            itemCount={filteredOptions.length}
                            itemSize={itemHeight}
                            width="100%"
                        >
                            {({index, style}) => {
                                const option = filteredOptions[index]
                                return (
                                    <ComboboxUI.Option
                                        as={'button'}
                                        className={classNames.item}
                                        key={option?.value.id}
                                        type={'button'}
                                        value={option?.value.name}
                                        style={style} // Стилизация каждого элемента через react-window
                                        onClick={() => onChange(option?.label as T)}
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