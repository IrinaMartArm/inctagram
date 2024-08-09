import { HeadMeta, PageWrapper, getMainLayout } from '@/shared/components'
import { MyPayment } from '@/widgets'

const PaymentSettings = () => {
  return (
    <PageWrapper>
      <HeadMeta title={'My payments'} />
      <MyPayment />
    </PageWrapper>
  )
}

PaymentSettings.getLayout = getMainLayout
export default PaymentSettings
