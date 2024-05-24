import { useState } from "react";

import {
  Alert,
  Button,
  ControlledTextArea,
  ControlledTextField,
  Select,
  Tab,
} from "@/shared/components";
import { ControlledDayPicker } from "@/shared/components/controlled/ControlledDayPicker";
import { EditProfilePhoto } from "@/widgets";
import {
  useProfileForm,
  useUpdateAvatar,
} from "@/widgets/profile/general/hook";
import { AvatarBox } from "@/widgets/profile/general/ui/avatarBox";
import { useRouter } from "next/router";

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

export const General = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    alertHandler,
    alertMessage,
    alertVariant,
    control,
    errors,
    handleSubmit,
    isValid,
    onSubmit,
    showAlert,
  } = useProfileForm();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);

  const { avatar, deletePhotoHandler, updateAvatar } = useUpdateAvatar();

  const handleCountryChange = (key: string, value: string) => {
    setSelectedCountry(value);
  };

  const getCityOptions = () => {
    if (selectedCountry === "Russia") {
      return russ;
    } else if (selectedCountry === "Belarus") {
      return belarus;
    } else {
      return belarus;
    }
  };

  const cities = getCityOptions();

  return (
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
            label={"Username"}
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
            label={"Last Name"}
            name={"lastName"}
            required
            type={"text"}
          />
          <ControlledDayPicker
            control={control}
            // errorMessage={errors.dateOfBirth?.message}
            label={"Date of birth"}
            mode={"single"}
            name={"dateOfBirth"}
          />
          <div className={s.selectors}>
            <Select
              className={s.select}
              defaultValue={countries[0].value}
              items={countries}
              label={"Select your country"}
              name={"countries"}
              onChange={handleCountryChange}
            />
            <Select
              className={s.select}
              defaultValue={cities[0].value}
              items={cities}
              label={"Select your city"}
              name={"city"}
              onChange={() => {}}
            />
          </div>
          <ControlledTextArea
            control={control}
            // errorMessage={errors.aboutMe?.message}
            label={"About Me"}
            name={"aboutMe"}
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
  );
};
