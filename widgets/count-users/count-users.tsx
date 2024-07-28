import React from 'react'

import { useTranslation } from '@/shared/assets'
import { Typography } from '@/shared/components'

import s from './count-users.module.scss'

type Props = {
  countUsers: number
}

export const CountUsers = ({ countUsers }: Props) => {
  const { t } = useTranslation()

  const minDigits = 6
  const formattedCount = countUsers
    .toString()
    .padStart(Math.max(minDigits, countUsers.toString().length), '0')

  return (
    <div className={s.countContainer}>
      <Typography variant={'h2'}>{t.countText.title}</Typography>
      <div className={s.countUsers}>
        {formattedCount.split('').map((digit, index) => (
          <div className={s.digitContainer} key={index}>
            <Typography className={s.digit} key={index} variant={'h2'}>
              {digit}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}
