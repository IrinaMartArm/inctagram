import { useProfileInformationQuery } from '@/shared/assets/api/profile/profile-api'
import { HeadMeta, Loader, PageWrapper, getMainLayout } from '@/shared/components'
import { General } from '@/widgets/profile/general'

const GeneralInformation = () => {
  const { data: profile } = useProfileInformationQuery()

  if (!profile) {
    return <Loader /> // или любой другой компонент загрузки/ошибки
  }

  return (
    <PageWrapper>
      <HeadMeta title={'General'} />
      <General profile={profile} />
    </PageWrapper>
  )
}

GeneralInformation.getLayout = getMainLayout
export default GeneralInformation
