import {
    ChangeEvent,
    Dispatch,
    FocusEventHandler,
    Fragment,
    MouseEventHandler,
    ReactNode,
    SetStateAction,
    useState,
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

export type ComboboxProps<T> = {
    name: string
    options: ComboboxOptionProps<T>[]
    onInputClick: () => void
    onChange: () => void
    getDataForCombobox: Dispatch<SetStateAction<ComboboxOptionProps<T> | null>>

    onClear?: () => void
    placeholder?: string

    isAsync?: boolean
    isLoading?: boolean
    disabled?: boolean
    errorMessage?: string
    label?: ReactNode
    portal?: boolean
    showClearButton?: boolean
    value: string
}
import {FixedSizeList as List} from 'react-window'


export const Combobox = <T extends string>({
                                               name,
                                               options,
                                               onChange,
                                               getDataForCombobox,
                                               onInputClick,
                                               onClear,
                                               placeholder,
                                               isAsync,
                                               isLoading,
                                               errorMessage,
                                               label,
                                               portal = true,
                                               showClearButton = true,
                                               onBlur,
                                               ref,
                                               value,
                                               disabled,
                                               ...comboboxProps
                                           }: ComboboxProps<T> & {
    onBlur?: FocusEventHandler<HTMLInputElement>
    ref?: React.Ref<HTMLInputElement>
}) => {
    const [inputValue, setInputValue] = useState<string>('')
    const showError = !!errorMessage && errorMessage.length > 0
    const isClearButtonVisible = showClearButton && !!value


    const handleClearButtonClicked: MouseEventHandler<HTMLDivElement> = () => {
        setInputValue('')
        onChange()
    }

    // if(!value){
    //     options = []
    // }

    const filteredOptions =
        inputValue === '' && !isAsync
            ? options
            : options.filter(option =>
                option.label.toLowerCase().includes(inputValue.toLowerCase())
            )

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value as T | ''
        console.log(e.currentTarget.value)
        setInputValue(newValue)
        onChange();

        // if (newValue === '') {
            // onChange(null)
        // } else {
            // onChange(newValue as T)
        // }
    }
    
    const getDisplayingValue = (optionValue: string) => {
        console.log(' optionValue: ', optionValue);
        const optionResult = options?.find(option => option.value.name === optionValue)
        getDataForCombobox(optionResult || null)
        console.log(' optionResult: ', optionResult);
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


    console.log(' value: ', value);
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
                                value={value}
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
                        <div className={classNames.clearButton} onClick={onClear ?? handleClearButtonClicked}>
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
                                        // onClick={() => onChange(option?.label as T)}
                                        onClick={onChange}
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