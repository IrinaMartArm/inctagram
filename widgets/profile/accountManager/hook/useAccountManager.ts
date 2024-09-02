import { useEffect, useState } from 'react'

import { handleErrorResponse, useTranslation } from '@/shared/assets'
import {
  useCreateSubscriptionMutation,
  useGetCurrentSubscriptionQuery,
} from '@/shared/assets/api/subscriptions/subscriptions-api'
import { SubscriptionsType } from '@/shared/assets/api/subscriptions/types'
import { formatDateString } from '@/shared/assets/helpers/formatDateString'
import { useOptions } from '@/widgets'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useRouter } from 'next/router'

export const useAccountManager = () => {
  const { t } = useTranslation()
  const { push, query } = useRouter()
  const [activeRadio, setActiveRadio] = useState('')
  const [subscriptionCost, setSubscriptionCost] = useState<SubscriptionsType>(SubscriptionsType.DAY)
  const [errorType, setErrorType] = useState<null | string>(null)
  const [autoRenewal, setAutoRenewal] = useState(false)

  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation()
  const { data: currentSubscriptionData, isLoading: isCurrentSubscriptionLoading } =
    useGetCurrentSubscriptionQuery()

  useEffect(() => {
    if (currentSubscriptionData?.customerId !== null) {
      setActiveRadio('Business')
      setAutoRenewal(currentSubscriptionData?.autoRenewal || false)
    } else {
      setActiveRadio('Personal')
    }
  }, [currentSubscriptionData])

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
    [SubscriptionsType.DAY]: 1,
    [SubscriptionsType.MONTHLY]: 30,
    [SubscriptionsType.WEEKLY]: 10,
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
      title: t.profileSettingAccountManager.day,
      value: SubscriptionsType.DAY,
    },
    {
      disabled: false,
      id: 'r2',
      title: t.profileSettingAccountManager.week,
      value: SubscriptionsType.WEEKLY,
    },
    {
      disabled: false,
      id: 'r3',
      title: t.profileSettingAccountManager.month,
      value: SubscriptionsType.MONTHLY,
    },
  ]

  const handlePay = async (paymentType: string) => {
    try {
      const response = await createSubscription({
        autoRenewal,
        paymentCount: 1,
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

  const currentExpireAt = currentSubscriptionData?.expireAt ?? null
  const expireAt = formatDateString(currentExpireAt)

  const currentNextPayment = currentSubscriptionData?.nextPayment ?? null
  const nextPayment = formatDateString(currentNextPayment)

  const handleChangeAutoRenewal = (isChecked: boolean) => {
    setAutoRenewal(isChecked)
  }

  return {
    accountManagerOptions,
    activeRadio,
    autoRenewal,
    changeActiveRadioItem,
    changeSubscriptionCost,
    currentSubscriptionData,
    expireAt,
    handleChangeAutoRenewal,
    handleCloseModal,
    handlePay,
    isCurrentSubscriptionLoading,
    isLoading,
    isModalOpen,
    modalTitle,
    nextPayment,
    options,
    subscriptionCosts,
    t,
  }
}
