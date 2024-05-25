import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

import { UserProfileArgs } from "@/shared/assets/api/profile/types";
import { Nullable } from "@/shared/assets/types/types";

import { UserInfoKeys } from "../ui/General";
import {
  belarus,
  getCityOptions,
  getCountryWithCityName,
} from "../utils/geography";

type QWERT = {
  aboutMe?: string | undefined;
  city?: string | undefined;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  username: string;
};

export const useSetUserInfo = (
  userData: UserProfileArgs | undefined,
  setValue: UseFormSetValue<QWERT /* UserProfileArgs */>,
) => {
  const [citiesRange, setCitiesRange] = useState(belarus);
  const [selectedCountry, setSelectedCountry] =
    useState<Nullable<string>>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    for (const key in userData) {
      setValue(key as UserInfoKeys, userData[key as UserInfoKeys]);
    }

    if (userData?.city) {
      const country = getCountryWithCityName(userData.city) as string;
      const citiesOfCountry = getCityOptions(country);

      setSelectedCountry(country);
      setCitiesRange(citiesOfCountry);
    } else {
      setValue("city", citiesRange[0].value);
    }
    if (userData?.dateOfBirth) {
      setSelectedDate(userData.dateOfBirth);
    }
  }, [citiesRange, setValue, userData]);

  return {
    citiesRange,
    selectedCountry,
    selectedDate,
    setCitiesRange,
    setSelectedCountry,
    setSelectedDate,
  };
};
