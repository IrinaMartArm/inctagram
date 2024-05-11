"use client";
import { ChangeEvent, useEffect, useState } from "react";

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
import { ControlledSelect } from "@/shared/components/controlled/ControlledSelect";
import { useProfileForm } from "@/widgets/general/hook/useProfileForm";
import { DevTool } from "@hookform/devtools";

import s from "./general.module.scss";

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
///get country with city name

const getCountryWithCityName = (cityFromServer: string) => {
  const countriesWithCities = {
    Belarus: belarus,
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
  /* | "dateOfBirth" */
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

      setSelectedCountry(country);
    }
  }, [setValue, userInfoData]);

  const [selectedCountry, setSelectedCountry] = useState("");

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
  };

  const handleSelectCity = (key: string, value: string) => {
    setValue("city", value, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const getCityOptions = (country: string) => {
    if (country === "Russia") {
      return russ;
    } else if (country === "Belarus") {
      return belarus;
    } else {
      return belarus;
    }
  };

  const cities = getCityOptions(selectedCountry);

  console.log(userInfoData?.city || cities[0].value);
  console.log(!(Object.keys(errors).length === 0));

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
          <div className={s.avatarBox}>
            <div className={s.avatar}></div>
            <Button variant={"outlined"}>Add a Profile Photo</Button>
          </div>
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
            <Input name={"date"} type={"text"} />
            <div className={s.selectors}>
              {selectedCountry && (
                <Select
                  className={s.general}
                  defaultValue={selectedCountry || countries[0].value}
                  items={countries}
                  label={"Select your country"}
                  name={"countries"}
                  onChange={handleSelectChange}
                />
              )}

              <ControlledSelect
                className={s.general}
                control={control}
                defaultValue={userInfoData?.city || cities[0].value}
                items={cities}
                label={"City"}
                name={"city"}
                onChange={handleSelectCity}
              />
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
        <Button
          className={s.button}
          disabled={/* !isValid */ !(Object.keys(errors).length === 0)}
          type={"submit"}
        >
          Save Changes
        </Button>
      </form>
    </>
  );
};
