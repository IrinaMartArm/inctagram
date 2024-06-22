import { Back } from '@/features'
import { useTranslationPages } from '@/shared/assets/hooks'
import { PageTitle } from '@/shared/components'

import s from './infoPage.module.scss'

import { InformationTextBlock } from './ui'

type Props = {
  numbersOfBlocks: number
}

export const InfoPage = ({ numbersOfBlocks }: Props) => {
  const { t } = useTranslationPages()
  const contentBlocks = Array.from({ length: numbersOfBlocks }, (_, i) => i + 1)

  return (
    <div className={s.wrapper}>
      <Back className={s.back} text={t.back} />
      <PageTitle className={s.title} textAlign={'center'} title={t.title} />
      {contentBlocks.map(block => (
        <InformationTextBlock content={t[block]} key={block} />
      ))}
    </div>
  )
}
