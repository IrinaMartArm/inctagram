import { HeadMeta } from '@/shared/components'
import { getLayout } from '@/shared/components/layout/baseLayout/BaseLayout'
import { PasswordRecovery } from '@/widgets'

const Password_recovery = () => {
  return (
    <>
      <HeadMeta title={'Password recovery'} />
      <PasswordRecovery />
    </>
  )
}

Password_recovery.getLayout = getLayout
export default Password_recovery
