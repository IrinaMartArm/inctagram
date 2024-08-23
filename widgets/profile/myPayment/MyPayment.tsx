import React, { useState } from 'react'

import { formatDate, tableHeadTitle, useTranslation } from '@/shared/assets'
import { useGetMyPaymentsQuery } from '@/shared/assets/api/profile/profile-api'
import { Tab, Table, Typography } from '@/shared/components'
import { Pagination } from '@/shared/components/pagination'
import { useOptions } from '@/widgets/profile/general/constants'

import s from './myPayment.module.scss'

export const MyPayment = () => {
  const { t } = useTranslation()
  const [pageSize, setPageSize] = useState<string>('8')
  const [currentPage, setCurrentPage] = useState(1)
  const onChangePageSize = (...props: string[]) => {
    setPageSize(props[1])
  }
  const { data, isLoading } = useGetMyPaymentsQuery({
    page: `${currentPage}`,
    pageSize: `${pageSize}`,
  })

  const options = useOptions()

  return (
    <div className={s.root}>
      <Tab defaultValue={'My Payments'} options={options} />
      <Table.Root className={s.tableRoot}>
        <Table.Head>
          <Table.Row>
            {tableHeadTitle.map(el => {
              return (
                <Table.HeadCell key={el.title}>
                  <Typography variant={'Semi-bold_middle-text'}>
                    {/*@ts-ignore*/}
                    {t.profileSettingMyPayment[el.title]}
                  </Typography>
                </Table.HeadCell>
              )
            })}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data?.items.map(item => {
            return (
              <Table.Row key={item.userId}>
                <Table.Cell>
                  <Typography variant={'regular_text-14'}>
                    {formatDate(item.dateOfPayment)}
                  </Typography>
                </Table.Cell>
                <Table.Cell>
                  <Typography variant={'regular_text-14'}>
                    {formatDate(item.endDateOfSubscription)}
                  </Typography>
                </Table.Cell>
                <Table.Cell>
                  <Typography variant={'regular_text-14'}>${item.price / 100}</Typography>
                </Table.Cell>
                <Table.Cell>
                  <Typography variant={'regular_text-14'}>{item.subscriptionTimeType}</Typography>
                </Table.Cell>
                <Table.Cell>
                  <Typography variant={'regular_text-14'}>{item.paymentType}</Typography>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={currentPage}
        onChangePageSize={onChangePageSize}
        onPageChange={setCurrentPage}
        pageSize={Number(pageSize)}
        totalCount={data?.totalCount || 1}
      />
    </div>
  )
}
