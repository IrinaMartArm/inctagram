import { HeadMeta } from '@/shared/components'
import { getLayout } from '@/shared/components/layout/baseLayout/BaseLayout'
import { InfoPage } from '@/widgets'

const PrivacyPolicy = () => {
  return (
    <>
      <HeadMeta title={'Privacy Policy'} />
      <InfoPage numbersOfBlocks={12} />
    </>
  )
}

PrivacyPolicy.getLayout = getLayout
export default PrivacyPolicy
