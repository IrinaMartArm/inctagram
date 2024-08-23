import { useEffect, useState } from 'react'

import { handleErrorResponse, useTranslation } from '@/shared/assets'
import { useCreateSubscriptionMutation } from '@/shared/assets/api/subscriptions/subscriptions-api'
import { SubscriptionsType } from '@/shared/assets/api/subscriptions/types'
import { useOptions } from '@/widgets'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useRouter } from 'next/router'

export const useAccountManager = () => {
  const { t } = useTranslation()
  const { push, query } = useRouter()
  const [activeRadio, setActiveRadio] = useState('')
  const [subscriptionCost, setSubscriptionCost] = useState<SubscriptionsType>(SubscriptionsType.DAY)
  const [errorType, setErrorType] = useState<null | string>(null)

  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation()

  const options = useOptions()

  const changeActiveRadioItem = (radioValue: string) => {
    setActiveRadio(radioValue)
  }

  const changeSubscriptionCost = (cost: SubscriptionsType) => {
    setSubscriptionCost(cost)
  }

  useEffect(() => {
    if (query.success) {
      setErrorType('success')
    }
    if (query.error) {
      setErrorType('error')
    }
  }, [query.success, query])

  const SubscriptionCostsMap: Record<SubscriptionsType, number> = {
    [SubscriptionsType.DAY]: 10,
    [SubscriptionsType.MONTHLY]: 100,
    [SubscriptionsType.WEEKLY]: 50,
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
    {
      disabled: false,
      id: 'r1',
      title: t.profileSettingAccountManager.ten,
      value: SubscriptionsType.DAY,
    },
    {
      disabled: false,
      id: 'r2',
      title: t.profileSettingAccountManager.fifty,
      value: SubscriptionsType.WEEKLY,
    },
    {
      disabled: false,
      id: 'r3',
      title: t.profileSettingAccountManager.hundred,
      value: SubscriptionsType.MONTHLY,
    },
  ]

  const handlePay = async (paymentType: string) => {
    try {
      const response = await createSubscription({
        autoRenewal: false,
        paymentCount: SubscriptionCostsMap[subscriptionCost],
        paymentType: paymentType,
        subscriptionTimeType: subscriptionCost,
      }).unwrap()

      void push(response.url)
    } catch (error) {
      handleErrorResponse(error as FetchBaseQueryError)
    }
  }

  const handleCloseModal = () => {
    setErrorType(null)
  }

  const isModalOpen = errorType !== null
  const modalTitle =
    errorType && errorType === 'success'
      ? 'Payment was successful!'
      : 'Transaction failed, please try again 😟'

  return {
    accountManagerOptions,
    activeRadio,
    changeActiveRadioItem,
    changeSubscriptionCost,
    handleCloseModal,
    handlePay,
    isLoading,
    isModalOpen,
    modalTitle,
    options,
    subscriptionCosts,
    t,
  }
}
