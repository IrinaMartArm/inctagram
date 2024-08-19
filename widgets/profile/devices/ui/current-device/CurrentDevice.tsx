import React from 'react'

import { Card, Typography } from '@/shared/components'

import s from './CurrentDevice.module.scss'

type Props = {
  icon: React.ReactNode
  ip: null | string
  title: string | undefined
}

export const CurrentDevice = ({ icon, ip, title }: Props) => {
  return (
    <Card className={s.currentDeviseCard}>
      <div>{icon}</div>
      <div className={s.dataDevice}>
        <div>
          <Typography variant={'Bold_text-16'}>{title}</Typography>
        </div>
        <div>
          <Typography variant={'regular_text-14'}>IP: {ip}</Typography>
        </div>
      </div>
    </Card>
  )
}
