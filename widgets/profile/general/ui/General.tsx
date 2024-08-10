import { UserProfileResponse } from '@/shared/assets/api/profile/types'
import {
  Alert,
  Button,
  ControlledDayPicker,
  ControlledTextArea,
  ControlledTextField,
  Tab,
} from '@/shared/components'
import { ControlledSelect } from '@/shared/components/controlled/ControlledSelect'
import { EditProfilePhoto, NOT_SELECTED, countries, options } from '@/widgets'
import { useProfileForm, useUpdateAvatar } from '@/widgets/profile/general/hook'
import { AvatarBox } from '@/widgets/profile/general/ui/avatarBox'

import s from './general.module.scss'

type Props = {
  profile: UserProfileResponse
}

export const General = ({ profile }: Props) => {
  const {
    alertHandler,
    alertMessage,
    alertVariant,
    control,
    errors,
    getCities,
    handleSubmit,
    isShowModal,
    isValid,
    loading,
    onSubmit,
    setIsShowModal,
    showAlert,
    t,
    watchCountry,
  } = useProfileForm(profile)

  const { avatar, deletePhotoHandler, updateAvatar } = useUpdateAvatar()

  return (
    <form className={s.root} onSubmit={handleSubmit(onSubmit)}>
      {showAlert && <Alert onClick={alertHandler} title={alertMessage} variant={alertVariant} />}
      <Tab defaultValue={'General information'} options={options} />
      <div className={s.container}>
        <AvatarBox
          avatar={avatar}
          deletePhoto={deletePhotoHandler}
          setIsShowModal={setIsShowModal}
        />
        <div className={s.form}>
          <ControlledTextField
            control={control}
            errorMessage={errors.username?.message}
            label={t.profileSettings.username}
            name={'username'}
            required
            type={'text'}
          />
          <ControlledTextField
            control={control}
            errorMessage={errors.firstName?.message}
            label={t.profileSettings.firstName}
            name={'firstName'}
            required
            type={'text'}
          />
          <ControlledTextField
            control={control}
            errorMessage={errors.lastName?.message}
            label={t.profileSettings.lastName}
            name={'lastName'}
            required
            type={'text'}
          />
          <ControlledDayPicker
            control={control}
            errorMessage={errors.dateOfBirth?.message}
            label={t.profileSettings.dateOfBirth}
            name={'dateOfBirth'}
          />
          <div className={s.selectors}>
            <ControlledSelect
              className={s.select}
              control={control}
              items={countries}
              label={t.profileSettings.selectYourCountry}
              name={'country'}
            />
            <ControlledSelect
              className={s.select}
              control={control}
              disabled={watchCountry === NOT_SELECTED}
              items={getCities()}
              label={t.profileSettings.selectYourCity}
              name={'city'}
            />
          </div>
          <ControlledTextArea
            control={control}
            errorMessage={errors.aboutMe?.message}
            label={t.profileSettings.aboutMe}
            name={'aboutMe'}
            placeholder={'Text-area'}
          />
        </div>
      </div>

      <Button className={s.button} disabled={!isValid || loading} type={'submit'}>
        {t.profileSettings.saveChanges}
      </Button>

      {isShowModal && (
        <EditProfilePhoto
          defaultOpen={isShowModal}
          photo={avatar}
          setIsShowModal={setIsShowModal}
          updateAvatar={updateAvatar}
        />
      )}
    </form>
  )
}
