import { GitHubBig, Google } from '@/public'
import { githubAuthRedirect, googleAuthRedirect } from '@/shared/assets/helpers/authentication'
import { Button } from '@/shared/components'

import s from './authWithSocial.module.scss'

export const AuthWithSocial = () => {
  const onGoogleLogin = () => googleAuthRedirect()

  const onGithubLogin = () => githubAuthRedirect()

  return (
    <div className={s.socials}>
      <Button onClick={onGoogleLogin} type={'button'} variant={'icon'}>
        <Google />
      </Button>
      <Button onClick={onGithubLogin} type={'button'} variant={'icon'}>
        <GitHubBig />
      </Button>
    </div>
  )
}
