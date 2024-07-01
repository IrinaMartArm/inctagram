import { HeadMeta } from '@/shared/components'
import { getLayout } from '@/shared/components/layout/baseLayout/BaseLayout'
import { InfoPage } from '@/widgets'

const TermsOfService = () => {
  return (
    <>
      <HeadMeta title={'Terms of Service'} />
      <InfoPage numbersOfBlocks={5} />
    </>
  )
}

TermsOfService.getLayout = getLayout
export default TermsOfService
