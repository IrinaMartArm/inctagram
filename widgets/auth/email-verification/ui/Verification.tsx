import { useState } from 'react'

import {
  usePasswordResendingMutation,
  useRegistrationResendingMutation,
} from '@/shared/assets/api/auth/auth-api'
import { MOBILE_BREAKPOINT } from '@/shared/assets/constants'
import { handleErrorResponse } from '@/shared/assets/helpers/handleErrorResponse'
import { useIsMobile, useTranslation } from '@/shared/assets/hooks'
import { Button, PageTitle, Typography } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { EmailSent } from '@/widgets'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './verification.module.scss'

export const Verification = () => {
  const { t } = useTranslation()
  const { query } = useRouter()
  const email = localStorage.getItem('email')

  const [passwordResending] = usePasswordResendingMutation()
  const [resending] = useRegistrationResendingMutation()

  const isMobile = useIsMobile(MOBILE_BREAKPOINT)

  const imageHeight = isMobile ? 230 : 300
  const imageWidth = isMobile ? 330 : 432

  const [open, setOpen] = useState(false)
  const onOpenChangeHandler = () => {
    setOpen(false)
  }

  const resendingHandler = () => {
    try {
      query
        ? passwordResending({ email: email || '' }).unwrap()
        : resending({ email: email || '' }).unwrap()
      setOpen(true)
    } catch (err: any) {
      handleErrorResponse(err)
    }
  }

  return (
    <div className={s.wrapper}>
      <PageTitle className={s.title} textAlign={'center'} title={t.verification.title} />
      <Typography className={s.expired} variant={'regular_text-16'}>
        {t.verification.description}
      </Typography>
      <div className={s.imageWithButton}>
        <Modal
          onOpenChange={onOpenChangeHandler}
          open={open}
          title={t.emailSent}
          trigger={
            <Button className={s.btn} onClick={resendingHandler}>
              {t.verification.titleButton}
            </Button>
          }
        >
          <EmailSent email={email || ''} />
        </Modal>
        <Image
          alt={'Congratulations!'}
          className={s.image}
          height={imageHeight}
          src={'/images/Boy.png'}
          width={imageWidth}
        />
      </div>
    </div>
  )
}
