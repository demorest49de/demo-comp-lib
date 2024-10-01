import {ComponentPropsWithoutRef, ElementRef, forwardRef} from 'react'
import s from './button.module.scss'
import clsx from 'clsx'
import {Slot} from '@radix-ui/react-slot'

type Props = {
    asChild?: boolean
    variant?: 'primary' | 'secondary' | 'outlined' | 'ghost'
    fullWidth?: boolean
    error?: string
} & ComponentPropsWithoutRef<'button'>

export const Button = forwardRef<ElementRef<'button'>, Props>(
    ({variant = 'primary', fullWidth, className, asChild, error, ...rest}, ref) => {
        const Component = asChild ? Slot : 'button'
        return (
            <>
                <Component
                    ref={ref}
                    className={clsx(
                        s.buttonRoot,
                        s[variant],
                        fullWidth && s.fullWidth,
                        className,
                        rest.disabled && s.disabled
                    )}
                    {...rest}
                />
                {error && <span className={''}>{error}</span>}
            </>
        )
    }
)
