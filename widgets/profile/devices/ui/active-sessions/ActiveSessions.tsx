import React from 'react'

import { LogOut_outline } from '@/public'
import { useTranslation } from '@/shared/assets'
import { Button, Card, Typography } from '@/shared/components'

import s from './ActiveSessions.module.scss'

type Props = {
  browserName: string | undefined
  date: string | undefined
  deviceTypeIcon: React.ReactNode
  logoutText: string
  onDelete: () => void
  osType: string | undefined
}

export const ActiveSessions = ({
  browserName,
  date,
  deviceTypeIcon,
  logoutText,
  onDelete,
  osType,
}: Props) => {
  const { t } = useTranslation()

  return (
    <Card className={s.activeSessionCard}>
      <div className={s.dataDevice}>
        <div>{deviceTypeIcon}</div>
        <div className={s.dataDeviceType}>
          <Typography variant={'Bold_text-16'}>{osType}</Typography>
          <div className={s.lastVisit}>
            <Typography variant={'small-text'}>
              {t.profileSettingDevices.lastVisit}: {date}
            </Typography>
            <Typography variant={'small-text'}>
              {t.profileSettingDevices.browser}: {browserName}
            </Typography>
          </div>
        </div>
      </div>
      <div>
        <Button onClick={onDelete} variant={'icon'}>
          <LogOut_outline />
          {logoutText}
        </Button>
      </div>
    </Card>
  )
}
