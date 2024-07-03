import { HeadMeta } from '@/shared/components'
import { getLayout } from '@/shared/components/layout/baseLayout/BaseLayout'
import { NewPasswordCard } from '@/widgets'

const NewPassword = () => {
  return (
    <>
      <HeadMeta title={'Password recovery'} />
      <NewPasswordCard />
    </>
  )
}

NewPassword.getLayout = getLayout
export default NewPassword
