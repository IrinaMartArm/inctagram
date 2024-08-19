import { HeadMeta, PageWrapper, getMainLayout } from '@/shared/components'
import { Devices } from '@/widgets'

const Device = () => {
  return (
    <PageWrapper>
      <HeadMeta title={'Devices'} />
      <Devices />
    </PageWrapper>
  )
}

Device.getLayout = getMainLayout
export default Device
