import clsx from 'clsx'

import s from './three-dots-spinner.module.scss'
import React, { CSSProperties } from 'react'

type Props = {
    spinnerClassName?: string
} & CSSProperties

export function ThreeDotsSpinner(props: Props) {
    const { spinnerClassName, ...style } = props
    return (
        <div className={clsx(s.loadWrapp, spinnerClassName)} style={style}>
            <div className={s.load10}>
                <div className={s.bar}></div>
            </div>
        </div>
    )
}
