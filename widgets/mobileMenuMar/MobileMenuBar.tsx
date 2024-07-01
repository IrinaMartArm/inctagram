import { Dialog, Home_outline, Person_outline, Search_outline } from '@/public'
import { Paths } from '@/shared/assets'
import { NavLink } from '@/shared/components'
import { AddPhotoForm } from '@/widgets/addPhotoForm/ui'

import s from './MobileMenuBar.module.scss'

const paths = [
  { icon: <Home_outline />, path: Paths.HOME, title: 'Home' },
  { icon: <AddPhotoForm />, path: '' },
  { icon: <Dialog />, path: Paths.MESSENGER, title: 'Messenger' },
  { icon: <Search_outline />, path: Paths.SEARCH, title: 'Search' },
  { icon: <Person_outline />, path: Paths.PROFILE, title: 'My Profile' },
]

export const MobileMenuBar = () => {
  return (
    <div className={s.wrapper}>
      {paths.map((path, i) => (
        <NavLink isTextHidden key={i} path={path} />
      ))}
    </div>
  )
}
