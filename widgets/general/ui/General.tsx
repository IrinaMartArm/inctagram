import { useState } from "react";

import { CloseRound } from "@/public";
import {
  useDeleteUserPhotoMutation,
  useUploadUserPhotoMutation,
} from "@/shared/assets/api/profile/profile-api";
import {
  Alert,
  Avatar,
  Button,
  ControlledTextArea,
  ControlledTextField,
  Input,
  Select,
  Tab,
} from "@/shared/components";
import { useProfileForm } from "@/widgets/general/hook/useProfileForm";
import { EditProfilePhoto } from "@/widgets/profile-photo";

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
  const [avatar, setAvatar] = useState<string | undefined>();
  const {
    alertHandler,
    alertMessage,
    alertVariant,
    control,
    handleSubmit,
    isValid,
    onSubmit,
    showAlert,
  } = useProfileForm();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);

  const [setPhoto] = useUploadUserPhotoMutation();
  const [deletePhoto] = useDeleteUserPhotoMutation();

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

  const updateAvatar = async (newAvatar: string | undefined) => {
    if (newAvatar) {
      await setPhoto({ file: newAvatar });
    } else {
      await deletePhoto();
    }
    setAvatar(newAvatar);
  };

  const deletePhotoHandler = async () => {
    await deletePhoto();
    setAvatar(undefined);
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
        <div className={s.avatarBox}>
          <Avatar
            alt={"avatar"}
            className={s.avatar}
            isEditProfile
            src={avatar}
          />
          {avatar && (
            <button
              className={s.buttonDeleteAvatar}
              onClick={deletePhotoHandler}
              type={"button"}
            >
              <CloseRound />
            </button>
          )}
          <Button onClick={() => setIsShowModal(true)} variant={"outlined"}>
            Add a Profile Photo
          </Button>
        </div>
        <div className={s.form}>
          <ControlledTextField
            control={control}
            label={"Username"}
            name={"username"}
            required
            type={"text"}
          />
          <ControlledTextField
            control={control}
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
          <Input name={"date"} type={"text"} />
          <div className={s.selectors}>
            <Select
              className={s.general}
              defaultValue={countries[0].value}
              items={countries}
              label={"Select your country"}
              name={"countries"}
              onChange={handleCountryChange}
            />
            <Select
              className={s.general}
              defaultValue={cities[0].value}
              items={cities}
              label={"Select your city"}
              name={"city"}
              onChange={() => {}}
            />
          </div>
          <ControlledTextArea
            control={control}
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
          title={"Add a Profile Photo"}
          updateAvatar={updateAvatar}
        />
      )}
    </form>
  );
};
