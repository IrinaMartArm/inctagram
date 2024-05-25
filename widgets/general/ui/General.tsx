"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller } from "react-hook-form";

import { useGetProfileInfoQuery } from "@/shared/assets/api/profile/profile-api";
import { UserProfileArgs } from "@/shared/assets/api/profile/types";
import { Nullable } from "@/shared/assets/types/types";
import {
  Alert,
  Button,
  ControlledTextArea,
  ControlledTextField,
  Input,
  Select,
  Tab,
} from "@/shared/components";
import { DayPicker } from "@/shared/components/DayPicker";
import { ControlledSelect } from "@/shared/components/controlled/ControlledSelect";
import { EditProfilePhoto } from "@/widgets";
import { DevTool } from "@hookform/devtools";

import s from "./general.module.scss";

import { useProfileForm, useUpdateAvatar } from "../hook";
import { useSetUserInfo } from "../hook/useSetUserInfo";
import {
  belarus,
  countries,
  getCityOptions,
  getCountryWithCityName,
  kazakhstan,
  russ,
} from "../utils/geography";
import { AvatarBox } from "./avatarBox";

const options = [
  {
    disabled: false,
    title: "General information",
    value: "General information",
  },
  { disabled: false, title: "Devices", value: "Devices" },
  { disabled: false, title: "Account Management", value: "Account Management" },
  { disabled: false, title: "My payments", value: "My payments" },
];

///get country with city name

export type UserInfoKeys =
  | "aboutMe"
  | "city"
  | "dateOfBirth"
  | "firstName"
  | "lastName"
  | "username";

export const General = () => {
  const {
    alertHandler,
    alertMessage,
    alertVariant,
    control,
    errors,
    handleSubmit,
    isDirty,
    isSubmitSuccessful,
    isValid,
    onSubmit,
    reset,
    setValue,
    showAlert,
  } = useProfileForm();

  const { data: userInfoData, error, isLoading } = useGetProfileInfoQuery();

  const {
    citiesRange,
    selectedCountry,
    selectedDate,
    setCitiesRange,
    setSelectedCountry,
    setSelectedDate,
  } = useSetUserInfo(userInfoData, setValue);

  useEffect(() => {
    //for setting all values isDirty false after submitting form
    if (isSubmitSuccessful) {
      reset(undefined, {
        keepDefaultValues: false,
        keepDirty: false,
      });
    }
  }, [isSubmitSuccessful, reset]);

  const [isShowModal, setIsShowModal] = useState(false);

  const { avatar, deletePhotoHandler, updateAvatar } = useUpdateAvatar();

  const handleAboutMeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;

    setValue("aboutMe", value, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleSelectCountry = (key: string, value: string) => {
    //when we change country we set the first city of a range
    const cities = getCityOptions(value);

    setSelectedCountry(value);
    setCitiesRange(cities);

    setValue("city", cities[0].value);
  };

  const handleSelectCity = (key: string, value: string) => {
    if (value.trim() === "") {
      ///when we change country in other select this function is triggering with value of empty string
      return;
    }

    setValue("city", value, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const isDisabled = !isValid && !isDirty;

  return (
    <>
      <DevTool control={control} />
      <form className={s.root} onSubmit={handleSubmit(onSubmit)}>
        {showAlert && (
          <Alert
            onClick={alertHandler}
            title={alertMessage}
            variant={alertVariant}
          />
        )}
        <Tab defaultValue={"General information"} options={options} />
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
              label={"User name"}
              name={"username"}
              required
              type={"text"}
            />
            <ControlledTextField
              control={control}
              errorMessage={errors.firstName?.message}
              label={"First Name"}
              name={"firstName"}
              required
              type={"text"}
            />
            <ControlledTextField
              control={control}
              errorMessage={errors.lastName?.message}
              label={"Last Name"}
              name={"lastName"}
              required
              type={"text"}
            />

            <Controller
              control={control}
              name={"dateOfBirth"}
              render={({ field: { onChange } }) => (
                <DayPicker
                  mode={"single"}
                  selected={selectedDate}
                  setSelected={(value: string) => {
                    onChange(value);
                    setSelectedDate(value);
                  }}
                />
              )}
            />
            <div className={s.selectors}>
              {selectedCountry && (
                <>
                  <Select
                    className={s.general}
                    defaultValue={selectedCountry}
                    items={countries}
                    label={"Select your country"}
                    name={"countries"}
                    onChange={handleSelectCountry}
                  />
                  <ControlledSelect
                    className={s.general}
                    control={control}
                    defaultValue={userInfoData?.city || citiesRange[0].value}
                    items={citiesRange}
                    label={"City"}
                    name={"city"}
                    onChange={handleSelectCity}
                  />
                </>
              )}
            </div>
            <ControlledTextArea
              control={control}
              error={errors.aboutMe?.message}
              label={"About Me"}
              name={"aboutMe"}
              onChangeValue={handleAboutMeChange}
              placeholder={"Text-area"}
            />
          </div>
        </div>
        <Button className={s.button} disabled={isDisabled} type={"submit"}>
          Save Changes
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
    </>
  );
};
