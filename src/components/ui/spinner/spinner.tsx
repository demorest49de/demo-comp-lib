import clsx from 'clsx'

import s from './spinner.module.scss'

type Props = {
  className?: string
    spinnerClassName?: string
}
export  function Spinner(props: Props) {
  return (
    <div className={clsx(s.spinWrapper, props.className)}>
      <div className={clsx(s.spinner, props.spinnerClassName)}></div>
    </div>
  )
}
