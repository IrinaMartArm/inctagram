import { Paths } from '@/shared/assets'

export const NOT_SELECTED = 'not_selected'

export const options = [
  {
    disabled: false,
    path: Paths.PROFILE_GENERAL,
    title: 'General information',
    value: 'General information',
  },
  { disabled: false, path: Paths.PROFILE_DEVICE, title: 'Devices', value: 'Devices' },
  {
    disabled: false,
    path: Paths.PROFILE_ACCOUNT,
    title: 'Account Management',
    value: 'Account Management',
  },
  { disabled: false, path: Paths.PROFILE_PAYMENTS, title: 'My payments', value: 'My payments' },
]
export const countries = [
  { title: 'Not selected', value: NOT_SELECTED },
  { title: 'Belarus', value: 'belarus' },
  { title: 'Russia', value: 'russia' },
]
export const russia = [
  { title: 'Not selected', value: NOT_SELECTED },
  { title: 'Moscow', value: 'Moscow' },
  { title: 'Krasnodar', value: 'Krasnodar' },
  { title: 'Sochi', value: 'Sochi' },
  { title: 'Volgograd', value: 'Volgograd' },
]
export const belarus = [
  { title: 'Not selected', value: NOT_SELECTED },
  { title: 'Minsk', value: 'Minsk' },
  { title: 'Vitebsk', value: 'Vitebsk' },
  { title: 'Gomel', value: 'Gomel' },
  { title: 'Brest', value: 'Brest' },
  { title: 'Novopolotsk', value: 'Novopolotsk' },
  { title: 'Mogilev', value: 'Mogilev' },
]
