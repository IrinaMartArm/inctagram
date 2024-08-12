import { MOBILE_BREAKPOINT } from '@/shared/assets/constants'
import { useIsMobile } from '@/shared/assets/hooks'
import { Select } from '@/shared/components'
import { useRouter } from 'next/router'

import s from './LangSelect.module.scss'

export const LangSelect = () => {
  const { asPath, locale, pathname, query, replace } = useRouter()
  const isMobile = useIsMobile(MOBILE_BREAKPOINT)

  const changeLangHandler = async (key: string, value: string) => {
    const locale = value

    // noinspection Annotator
    await replace({ pathname, query }, asPath, { locale })
  }

  const options = [
    {
      img: '/images/FlagUK.svg',
      title: 'English',
      value: 'en',
    },
    {
      img: '/images/FlagRussia.svg',
      title: 'Русский',
      value: 'ru',
    },
  ]

  return (
    <Select
      className={s.langSelect}
      defaultValue={locale}
      isHiddenText={isMobile}
      items={options}
      onChange={changeLangHandler}
    />
  )
}
