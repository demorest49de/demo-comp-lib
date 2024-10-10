import clsx from 'clsx'

import s from './three-dots-spinner.module.scss'

type Props = {
  spinnerclassName?: string
}
export function ThreeDotsSpinner(props: Props) {
  return (
    <div className={clsx(s.loadWrapp, props.spinnerclassName)}>
      <div className={s.load10}>
        <div className={s.bar}></div>
      </div>
    </div>
  )
}
