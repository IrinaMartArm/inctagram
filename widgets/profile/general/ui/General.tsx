import { UserProfileResponse } from '@/shared/assets/api/profile/types'
import {
  Alert,
  Button,
  ControlledDayPicker,
  ControlledTextArea,
  ControlledTextField,
  Select,
  Tab,
} from '@/shared/components'
import { EditProfilePhoto, belarus, countries, options } from '@/widgets'
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
    cities,
    control,
    errors,
    handleCityChange,
    handleCountryChange,
    handleSubmit,
    isShowModal,
    isValid,
    onSubmit,
    selectedCity,
    selectedCountry,
    setIsShowModal,
    showAlert,
    t,
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
            label={t.username}
            name={'username'}
            required
            type={'text'}
          />
          <ControlledTextField
            control={control}
            errorMessage={errors.firstName?.message}
            label={t.firstName}
            name={'firstName'}
            required
            type={'text'}
          />
          <ControlledTextField
            control={control}
            errorMessage={errors.lastName?.message}
            label={t.lastName}
            name={'lastName'}
            required
            type={'text'}
          />
          <ControlledDayPicker
            control={control}
            errorMessage={errors.dateOfBirth?.message}
            label={t.dateOfBirth}
            name={'dateOfBirth'}
          />
          <div className={s.selectors}>
            <Select
              className={s.select}
              defaultValue={'Not chosen'}
              items={countries}
              label={t.selectYourCountry}
              name={'countries'}
              onChange={handleCountryChange}
              value={selectedCountry}
            />
            <Select
              className={s.select}
              defaultValue={'Not chosen'}
              items={cities}
              label={t.selectYourCity}
              name={'city'}
              onChange={handleCityChange}
              value={selectedCity}
            />
          </div>
          <ControlledTextArea
            control={control}
            errorMessage={errors.aboutMe?.message}
            label={t.aboutMe}
            name={'aboutMe'}
            placeholder={'Text-area'}
          />
        </div>
      </div>
      <Button className={s.button} disabled={!isValid} type={'submit'}>
        {t.saveChanges}
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
