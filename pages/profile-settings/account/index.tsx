import { HeadMeta, PageWrapper, getMainLayout } from '@/shared/components'
import { AccountManager } from '@/widgets'

const Account = () => {
  return (
    <PageWrapper>
      <HeadMeta title={'Account Management'} />
      <AccountManager />
    </PageWrapper>
  )
}

Account.getLayout = getMainLayout
export default Account
