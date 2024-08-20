import { useState } from 'react'

import { useTranslation } from '@/shared/assets'
import { useCreateSubscriptionMutation } from '@/shared/assets/api/subscriptions/subscriptions-api'
import { useOptions } from '@/widgets'

export const useAccountManager = () => {
  const { t } = useTranslation()
  const [activeRadio, setActiveRadio] = useState('')
  const [subscriptionCost, setSubscriptionCost] = useState(0)

  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation()

  const options = useOptions()

  const changeActiveRadioItem = (radioValue: string) => {
    setActiveRadio(radioValue)
  }

  const changeSubscriptionCost = (cost: string) => {
    setSubscriptionCost(cost)
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
    { disabled: false, id: 'r1', title: t.profileSettingAccountManager.ten, value: 10 },
    { disabled: false, id: 'r2', title: t.profileSettingAccountManager.fifty, value: 50 },
    { disabled: false, id: 'r3', title: t.profileSettingAccountManager.hundred, value: 100 },
  ]

  const handleStripe = () => {
    createSubscription({
      autoRenewal: true,
      paymentCount: subscriptionCost,
      paymentType: '',
      subscriptionTimeType: '',
    })
  }
  const handlePayPal = () => {}

  return {
    accountManagerOptions,
    activeRadio,
    changeActiveRadioItem,
    changeSubscriptionCost,
    options,
    subscriptionCosts,
    t,
  }
}
