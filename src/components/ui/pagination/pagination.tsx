import { ArrowIosBack, ArrowIosForward } from '@/assets/components'
import { DOTS, usePagination } from '@/components/ui/pagination/hooks/usePagination'

import s from './pagination.module.scss'
import { Button, Select, SelectItem } from '@/components/ui'
import clsx from 'clsx'

type Props = {
  className?: string
  currentPage: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  pageSize: number
  siblingCount?: number // колличество отображаемых эллементов между точек с каждой стороны от выбранной страницы
  totalCount: number
}
export const Pagination = ({ currentPage, ...restProps }: Props) => {
  const {
    className,
    onPageChange,
    onPageSizeChange,
    pageSize,
    siblingCount = 1,
    totalCount,
    ...rest
  } = restProps

  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount,
    totalCount,
  })

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange!.length < 2) {
    return null
  }
  if (currentPage === null) {
    currentPage = 1
  }
  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const onPageSizeChangeHandler = (newValue: string) => {
    onPageSizeChange(parseInt(newValue))
  }

  const lastPage = paginationRange![paginationRange!.length - 1]

  return (
    <div className={clsx(s.wrapContainer, className)}>
      <button className={clsx(s.buttonLeft)} disabled={currentPage === 1} onClick={onPrevious}>
        <ArrowIosBack />
      </button>
      <div className={clsx(s.paginationContainer)}>
        {paginationRange?.map((pageNumber, i) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <span className={clsx(s.paginationItem, s.dots)} key={i}>
                &#8230;
              </span>
            )
          }

          // Render our Page Pills
          return (
            <Button
              className={clsx(s.paginationItem, pageNumber === currentPage && s.selected)}
              key={i}
              onClick={() => onPageChange(+pageNumber)}
            >
              {pageNumber}
            </Button>
          )
        })}
      </div>
      <button className={clsx(s.buttonRight)} disabled={currentPage === lastPage} onClick={onNext}>
        <ArrowIosForward />
      </button>

      <div className={s.selectContainer}>
        Показать
        <Select defaultValue={'10'} onValueChange={onPageSizeChangeHandler} {...rest}>
          <SelectItem value={'10'}>10</SelectItem>
          <SelectItem value={'20'}>20</SelectItem>
          <SelectItem value={'30'}>30</SelectItem>
          <SelectItem value={'50'}>50</SelectItem>
          <SelectItem value={'100'}>100</SelectItem>
        </Select>
        на странице
      </div>
    </div>
  )
}
