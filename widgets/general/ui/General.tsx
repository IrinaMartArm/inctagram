"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller } from "react-hook-form";

import { useGetProfileInfoQuery } from "@/shared/assets/api/profile/profile-api";
import { UserProfileArgs } from "@/shared/assets/api/profile/types";
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
import { AvatarBox } from "./avatarBox";

const convertStringToDate = (value: string): Date => {
  ///trnsfer to util function file
  const dateString = value;
  const parts = dateString.split(".");

  // Ensure the parts are in the correct order (day, month, year)
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // JavaScript Date month is 0-indexed
  const year = parseInt(parts[2], 10);

  const date = new Date(year, month, day);

  console.log(date);

  return date;
};

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
const countries = [
  { title: "Belarus", value: "Belarus" },
  { title: "Russia", value: "Russia" },
  { title: "Kazakhstan", value: "Kazakhstan" },
  { title: "Georgia", value: "Georgia" },
  { title: "Armenia", value: "Armenia" },
];
const russ = [
  { title: "Moscow", value: "Moscow" },
  { title: "Krasnodar", value: "Krasnodar" },
  { title: "Sochi", value: "Sochi" },
  { title: "Volgograd", value: "Volgograd" },
];
const belarus = [
  { title: "Minsk", value: "Minsk" },
  { title: "Vitebsk", value: "Vitebsk" },
  { title: "Gomel", value: "Gomel" },
  { title: "Brest", value: "Brest" },
];
const kazakhstan = [
  { title: "Astana", value: "Astana" },
  { title: "Aqtobe", value: "Aqtobe" },
  { title: "Kostanai", value: "Kostanai" },
  { title: "Karaganda", value: "Karaganda" },
];
///get country with city name

const getCountryWithCityName = (cityFromServer: string) => {
  const countriesWithCities = {
    Belarus: belarus,
    Kazakhstan: kazakhstan,
    Russia: russ,
  };

  for (const [country, cities] of Object.entries(countriesWithCities)) {
    // Проверяем, есть ли город в массиве городов текущей страны
    if (cities.some((city) => city.value === cityFromServer)) {
      return country;
    }
  }

  return null;
};

type UserInfoKeys =
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
    isValid,
    onSubmit,
    setValue,
    showAlert,
  } = useProfileForm();

  const { data: userInfoData, error, isLoading } = useGetProfileInfoQuery();

  useEffect(() => {
    for (const key in userInfoData) {
      setValue(key as UserInfoKeys, userInfoData[key as UserInfoKeys]);
    }

    if (userInfoData?.city) {
      const country = getCountryWithCityName(userInfoData.city) as string;

      setInitialCity(userInfoData.city);
      setSelectedCountry(country);
    }
  }, [setValue, userInfoData]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [initialCity, setInitialCity] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [birthDate, setBirthDate] = useState<string>("");

  const { avatar, deletePhotoHandler, updateAvatar } = useUpdateAvatar();

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  };

  const handleAboutMeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;

    setValue("aboutMe", value, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleSelectChange = (key: string, value: string) => {
    setSelectedCountry(value);
    setInitialCity(cities[0].value);
  };

  const handleSelectCity = (key: string, value: string) => {
    setValue("city", value, {
      shouldDirty: true,
      shouldTouch: true,
    });
    setInitialCity(value);
  };

  const getCityOptions = (country: string) => {
    if (country === "Russia") {
      return russ;
    } else if (country === "Belarus") {
      return belarus;
    } else if (country === "Kazakhstan") {
      return kazakhstan;
    } else {
      return belarus;
    }
  };

  const cities = getCityOptions(selectedCountry);
  const isDisabled = !isValid && !isDirty;

  //console.log(cities[0].value);
  console.log(initialCity);

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
              render={({ field: { onBlur, onChange, ref, value } }) => (
                <DayPicker
                  mode={"single"}
                  selected={birthDate}
                  setSelected={(value: string) => {
                    const date = convertStringToDate(value);

                    setValue("dateOfBirth", date, {
                      shouldDirty: true,
                      shouldTouch: true,
                    });

                    setBirthDate(value);
                  }}
                />
              )}
            />
            <div className={s.selectors}>
              {selectedCountry && (
                <Select
                  className={s.general}
                  defaultValue={selectedCountry /* || countries[0].value */}
                  items={countries}
                  label={"Select your country"}
                  name={"countries"}
                  onChange={handleSelectChange}
                />
              )}

              {initialCity && (
                <ControlledSelect
                  className={s.general}
                  control={control}
                  defaultValue={
                    userInfoData?.city || cities[0].value || initialCity
                  }
                  items={cities}
                  label={"City"}
                  name={"city"}
                  onChange={handleSelectCity}
                />
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
        <Button className={s.button} disabled={!isValid} type={"submit"}>
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
