import {
  Bookmark_outline,
  Dialog,
  Home_outline,
  Person_outline,
  Search_outline,
  Statistics,
} from '@/public'
import { Paths } from '@/shared/assets'
import { useMeQuery } from '@/shared/assets/api/auth/auth-api'
import { useTranslation } from '@/shared/assets/hooks'
import { SideBar } from '@/shared/components'
import { LogOutModal } from '@/widgets'
import { AddPhotoForm } from '@/widgets/addPhotoForm/ui'

import s from './mainSideBar.module.scss'

import { NavLinks } from './ui'

export const MainSideBar = () => {
  const { t } = useTranslation()
  const { data: me } = useMeQuery()
  const { create, favorites, home, messenger, myProfile, search, statistics } = t.menu

  const basicPaths = [
    { icon: <Home_outline />, path: Paths.HOME, title: home },
    { icon: <AddPhotoForm />, title: create },
    { icon: <Person_outline />, path: `${Paths.PROFILE}?id=${me?.userId}`, title: myProfile },
    {
      icon: <Dialog />,
      path: Paths.MESSENGER,
      title: messenger,
    },
    { icon: <Search_outline />, path: Paths.SEARCH, title: search },
  ]

  const otherPaths = [
    { icon: <Statistics />, path: Paths.STATISTIC, title: statistics },
    {
      icon: <Bookmark_outline />,
      path: Paths.FAVORITES,
      title: favorites,
    },
  ]
  // const email = useAppSelector(userEmailSelector);
  const email = localStorage.getItem('email')

  return (
    <SideBar>
      <div className={s.root}>
        <div className={s.box}>
          <NavLinks paths={basicPaths} />
          <NavLinks paths={otherPaths} />
        </div>

        <LogOutModal email={email || ''} />
      </div>
    </SideBar>
  )
}
