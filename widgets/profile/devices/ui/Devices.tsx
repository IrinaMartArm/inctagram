import React, { useEffect, useState } from 'react'

import {
  Brave,
  Browser,
  Chrome,
  Desktop,
  Firefox,
  MicrosoftEdge,
  Opera,
  Phone,
  Safari,
  Yandex,
} from '@/public/icons'
import { useTranslation } from '@/shared/assets'
import {
  useDeleteAllDevicesMutation,
  useDeleteDeviceMutation,
  useGetDevicesQuery,
} from '@/shared/assets/api/devices/devices-api'
import { DevicesArg } from '@/shared/assets/api/devices/types'
import { Button, Tab, Typography } from '@/shared/components'
import { useOptions } from '@/widgets'
import { ActiveSessions } from '@/widgets/profile/devices/ui/active-sessions/ActiveSessions'
import { CurrentDevice } from '@/widgets/profile/devices/ui/current-device/CurrentDevice'
import { UAParser } from 'ua-parser-js'

import s from './Devices.module.scss'

const getIP = async () => {
  const response = await fetch('https://api.ipify.org/?format=json')
  const data = await response.json()

  return data.ip
}

const iconBrowser = (browserName: string | undefined): React.ReactNode => {
  switch (browserName) {
    case 'Chrome':
      return <Chrome />
    case 'Firefox':
      return <Firefox />
    case 'Safari' || 'Mobile Safari':
      return <Safari />
    case 'Edge':
      return <MicrosoftEdge />
    case 'Opera':
      return <Opera />
    case 'Yandex':
      return <Yandex />
    case 'Brave':
      return <Brave />
    default:
      return <Browser />
  }
}

// const getDeviceType = (deviceType: string | undefined): string => {
//   switch (deviceType) {
//     case 'wearable':
//       return 'Wearable'
//     case 'mobile':
//       return 'Mobile'
//     case 'console':
//       return 'Console'
//     case 'tablet':
//       return 'Tablet'
//     case 'smarttv':
//       return 'Smarttv'
//     case 'embedded':
//       return 'Embedded'
//     default:
//       return 'Desktop'
//   }
// }

const getDeviceTypeIcon = (deviceType: string | undefined): React.ReactNode => {
  switch (deviceType) {
    case 'mobile':
      return <Phone />
    default:
      return <Desktop />
  }
}

export const Devices = () => {
  const { t } = useTranslation()
  const { data } = useGetDevicesQuery()
  const [deleteAllDevices] = useDeleteAllDevicesMutation()
  const [deleteDevice] = useDeleteDeviceMutation()
  const [ip, setIP] = useState(null)
  const [loading, setLoading] = useState(true)
  const options = useOptions()

  useEffect(() => {
    getIP().then(ip => {
      setIP(ip)
      setLoading(false)
    })
  }, [])

  const { browser } = new UAParser().getResult()

  const processedDevices = data?.map((device: DevicesArg) => {
    const dataParser = new UAParser(device.title)
    const browserName = dataParser.getBrowser().name
    const osType = dataParser.getOS().name
    const deviceType = dataParser.getDevice().type

    const deviceTypeIcon = getDeviceTypeIcon(deviceType)

    return {
      ...device,
      browserName,
      deviceType,
      deviceTypeIcon,
      formattedDate: new Date(device.lastActiveDate).toLocaleDateString('ru-RU', {
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        month: '2-digit',
        second: '2-digit',
        year: 'numeric',
      }),
      osType,
    }
  })

  const handleDeleteAllDevices = () => {
    deleteAllDevices().unwrap()
  }

  const handleDeleteDevice = (id: string) => {
    deleteDevice(id).unwrap()
  }

  return (
    <div>
      <Tab defaultValue={'Devices'} options={options} />
      <div className={s.container}>
        <Typography variant={'h3'}>{t.profileSettingDevices.currentDevice}</Typography>
        <CurrentDevice
          icon={iconBrowser(browser?.name)}
          ip={loading ? 'Loading...' : ip}
          title={browser?.name}
        />
      </div>
      <div className={s.terminateSessions}>
        <Button onClick={handleDeleteAllDevices} variant={'outlined'}>
          {t.profileSettingDevices.terminateSessions}
        </Button>
      </div>
      <div className={s.container}>
        <Typography variant={'h3'}>{t.profileSettingDevices.activeSessions}</Typography>
        <div className={s.activeSessions}>
          {processedDevices?.map(device => (
            <ActiveSessions
              browserName={device.browserName}
              date={device.formattedDate}
              deviceTypeIcon={device.deviceTypeIcon}
              key={device.deviceId}
              logoutText={t.profileSettingDevices.logout}
              onDelete={() => handleDeleteDevice(device.deviceId)}
              osType={device.osType}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
