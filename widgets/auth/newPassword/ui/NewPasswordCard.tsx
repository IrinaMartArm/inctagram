import {
  Button,
  Card,
  ControlledTextField,
  Loader,
  PageTitle,
  Typography,
} from '@/shared/components'
import { useNewPassword } from '@/widgets/auth/newPassword/hook/useNewPassword'

import s from './newPassword.module.scss'

export const NewPasswordCard = () => {
  const { control, errors, handleSubmit, isLoading, newPasswordCreator, t } = useNewPassword()

  if (isLoading) {
    return <Loader />
  }

  return (
    <Card as={'form'} onSubmit={handleSubmit(newPasswordCreator)}>
      <PageTitle className={s.title} title={t.title} />

      <ControlledTextField
        autoComplete={'newPassword'}
        control={control}
        errorMessage={errors.newPassword?.message}
        label={t.newPassword}
        name={'newPassword'}
        placeholder={t.newPassword}
        type={'password'}
      />
      <ControlledTextField
        control={control}
        errorMessage={errors.passwordConfirmation?.message}
        label={t.passwordConfirmation}
        name={'passwordConfirmation'}
        placeholder={t.passwordConfirmation}
        type={'password'}
      />
      <Typography className={s.text} variant={'regular_text-14'}>
        {t.rules}
      </Typography>
      <Button fullWidth type={'submit'}>
        {t.title}
      </Button>
    </Card>
  )
}
