import { JSX } from 'react'

import { LeftArrowIcon, RightArrowIcon } from '@/public'
import { useTranslation } from '@/shared/assets'
import { Button, Select, Typography } from '@/shared/components'
import cn from 'classnames'

import s from './Pagination.module.scss'

import { usePagination } from './usePagination'

export type PaginationProps = {
  currentPage: number
  onChangePageSize: (key: string, value: string) => void
  onPageChange: (pageNumber: number) => void
  pageSize: number
  siblingCount?: number
  totalCount: number
}
export const Pagination = ({
  currentPage,
  onChangePageSize,
  onPageChange,
  pageSize,
  siblingCount = 1,
  totalCount,
  ...restProps
}: PaginationProps): JSX.Element => {
  const totalPageCount = Math.ceil(totalCount / Number(pageSize))
  const paginationItems = usePagination({ currentPage, siblingCount, totalPageCount })
  const { t } = useTranslation()
  const classNames = {
    controller(disabled: boolean) {
      return cn(s.controller, disabled && s.disabledController)
    },
    dots: s.dots,
    item(itemNumber: number) {
      return cn(s.item, itemNumber === currentPage && s.activeItem)
    },
    paginationContainer: s.paginationContainer,
    root: s.root,
    select: s.select,
    selectContainer: s.selectContainer,
  }

  const setPrevPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1)
    }
  }
  const setNextPage = () => {
    if (currentPage !== totalPageCount) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className={classNames.root}>
      <div className={classNames.paginationContainer}>
        <Button
          className={classNames.controller(currentPage === 1)}
          onClick={setPrevPage}
          tabIndex={0}
          variant={'icon'}
        >
          <LeftArrowIcon />
        </Button>
        {paginationItems.map((num, index) => {
          if (num === '...') {
            return (
              <Button className={classNames.dots} key={index} tabIndex={-1}>
                {num}
              </Button>
            )
          } else {
            return (
              <Button
                className={classNames.item(num)}
                key={index}
                onClick={() => onPageChange(num)}
                tabIndex={0}
                variant={'icon'}
              >
                {/*variant?: 'icon' | 'link' | 'outlined' | 'primary' | 'secondary'*/}
                <Typography as={'span'} variant={'regular_text-14'}>
                  {num}
                </Typography>
              </Button>
            )
          }
        })}
        <Button
          className={classNames.controller(currentPage === totalPageCount)}
          onClick={setNextPage}
          tabIndex={0}
          variant={'icon'}
        >
          <RightArrowIcon />
        </Button>
      </div>
      <div className={classNames.selectContainer}>
        <Typography as={'span'} variant={'regular_text-14'}>
          {t.profileSettingMyPayment.show}
        </Typography>
        <Select
          className={classNames.select}
          {...restProps}
          defaultValue={`8`}
          isPagination
          items={[
            { title: '8', value: '8' },
            { title: '10', value: '10' },
            { title: '12', value: '12' },
            { title: '15', value: '15' },
          ]}
          onChange={onChangePageSize}
        />
        <Typography as={'span'} className={s.text} variant={'regular_text-14'}>
          {t.profileSettingMyPayment.onPage}
        </Typography>
      </div>
    </div>
  )
}
