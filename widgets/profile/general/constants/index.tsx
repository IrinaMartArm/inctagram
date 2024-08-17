import { useMemo } from 'react'

import { Paths } from '@/shared/assets'
import { useTranslation } from '@/shared/assets/hooks'

export const NOT_SELECTED = 'not_selected'

export const useOptions = () => {
  const { t } = useTranslation()

  return useMemo(
    () => [
      {
        disabled: false,
        path: Paths.PROFILE_GENERAL,
        title: t.myProfile.generalInformation,
        value: 'General Information',
      },
      {
        disabled: false,
        path: Paths.PROFILE_DEVICE,
        title: t.myProfile.devices,
        value: 'Devices',
      },
      {
        disabled: false,
        path: Paths.PROFILE_ACCOUNT,
        title: t.myProfile.accountManagement,
        value: 'Account Management',
      },
      {
        disabled: false,
        path: Paths.PROFILE_PAYMENTS,
        title: t.myProfile.myPayments,
        value: 'My Payments',
      },
    ],
    [t]
  )
}

export const useCountries = () => {
  const { t } = useTranslation()

  return useMemo(
    () => [
      { title: t.countries.notSelected, value: NOT_SELECTED },
      { title: t.countries.belarus, value: 'belarus' },
      { title: t.countries.russia, value: 'russia' },
    ],
    [t]
  )
}
export const useRussia = () => {
  const { t } = useTranslation()

  return useMemo(
    () => [
      { title: t.countries.notSelected, value: NOT_SELECTED },
      { title: t.cities.Moscow, value: 'Moscow' },
      { title: t.cities.Krasnodar, value: 'Krasnodar' },
      { title: t.cities.Sochi, value: 'Sochi' },
      { title: t.cities.Volgograd, value: 'Volgograd' },
    ],
    [t]
  )
}
export const useBelarus = () => {
  const { t } = useTranslation()

  return useMemo(
    () => [
      { title: t.countries.notSelected, value: NOT_SELECTED },
      { title: t.cities.Minsk, value: 'Minsk' },
      { title: t.cities.Vitebsk, value: 'Vitebsk' },
      { title: t.cities.Gomel, value: 'Gomel' },
      { title: t.cities.Brest, value: 'Brest' },
      { title: t.cities.Novopolotsk, value: 'Novopolotsk' },
      { title: t.cities.Mogilev, value: 'Mogilev' },
    ],
    [t]
  )
}
