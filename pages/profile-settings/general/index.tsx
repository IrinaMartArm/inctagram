import { HeadMeta, PageWrapper, getMainLayout } from '@/shared/components'
import { General } from '@/widgets/profile/general'

const GeneralInformation = () => {
  return (
    <PageWrapper>
      <HeadMeta title={'General'} />
      <General />
    </PageWrapper>
  )
}

GeneralInformation.getLayout = getMainLayout
export default GeneralInformation
