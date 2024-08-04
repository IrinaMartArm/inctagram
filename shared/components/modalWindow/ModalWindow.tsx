import { useTranslation } from '@/shared/assets'
import { Button, ModalClose, Typography } from '@/shared/components'

import s from './modalWindou.module.scss'

type ModalWindowProps = {
  callback: () => void
  text: string
  text_2?: string
}

export const ModalWindow = ({ callback, text, text_2 }: ModalWindowProps) => {
  const { t } = useTranslation()

  return (
    <div className={s.root}>
      <Typography variant={'regular_text-16'}>
        {text}
        <Typography as={'span'} variant={'Bold_text-16'}>
          {'  '}
          {text_2 ?? ''}
        </Typography>
      </Typography>
      <div className={s.controller}>
        <Button className={s.button} onClick={callback} variant={'outlined'}>
          {t.common.yes}
        </Button>
        <ModalClose>
          <Button className={s.button}>{t.common.no}</Button>
        </ModalClose>
      </div>
    </div>
  )
}
