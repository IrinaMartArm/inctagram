import React, { useState } from 'react'

import { PayPalIcon, StripeIcon } from '@/public'
import { useTranslation } from '@/shared/assets'
import { Card, Tab, Typography } from '@/shared/components'
import { RadioGroup } from '@/shared/components/radioGroup'
import { options } from '@/widgets'

import s from './accountManager.module.scss'
export const AccountManager = () => {
  const { t } = useTranslation()
  const [activeRadio, setActiveRadio] = useState('')
  const changeActiveRadioItem = (radioValue: string) => {
    setActiveRadio(radioValue)
  }
  const accountManagerOptions = [
    {
      disabled: false,
      id: 'r1',
      title: t.profileSettingAccountManager.personal,
      value: 'Personal',
    },
    {
      disabled: false,
      id: 'r2',
      title: t.profileSettingAccountManager.business,
      value: 'Business',
    },
  ]
  const subscriptionCosts = [
    { disabled: false, id: 'r1', title: t.profileSettingAccountManager.ten, value: 'first' },
    { disabled: false, id: 'r2', title: t.profileSettingAccountManager.fifty, value: 'second' },
    { disabled: false, id: 'r3', title: t.profileSettingAccountManager.hundred, value: 'third' },
  ]

  return (
    <div>
      <Tab defaultValue={'Account Management'} options={options} />
      <div className={s.container}>
        <div className={s.accountTypeContainer}>
          <Typography variant={'h3'}>{t.profileSettingAccountManager.accountType}</Typography>
          <Card className={s.radioGroupContainer}>
            <RadioGroup
              defaultValue={'Personal'}
              onValueChange={changeActiveRadioItem}
              options={accountManagerOptions}
            />
          </Card>
        </div>
        <div>
          {activeRadio === 'Business' && (
            <div className={s.accountTypeContainer}>
              <Typography variant={'h3'}>
                {t.profileSettingAccountManager.yourSubscriptionCosts}
              </Typography>
              <Card className={s.radioGroupContainer}>
                <RadioGroup options={subscriptionCosts} />
              </Card>
              <div className={s.paymentOptionsContainer}>
                <PayPalIcon />
                <Typography variant={'regular_text-14'}>
                  {t.profileSettingAccountManager.or}
                </Typography>
                <StripeIcon />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
