import { useForm } from "react-hook-form";

import {
  Button,
  ControlledTextArea,
  ControlledTextField,
  PageWrapper,
  Select,
  Tab,
  Typography,
} from "@/shared/components";
import { Textarea } from "@/shared/components/textarea/Textarea";

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

export const General = () => {
  const { control } = useForm();

  return (
    <div className={s.root}>
      <Tab defaultValue={"General information"} options={options} />
      <div className={s.container}>
        <div className={s.avatarBox}>
          <div className={s.avatar}></div>
          <Button variant={"outlined"}>Add a Profile Photo</Button>
        </div>
        <div className={s.form}>
          <ControlledTextField
            control={control}
            label={"Username"}
            name={"Username"}
            required
            type={"text"}
          />
          <ControlledTextField
            control={control}
            label={"First Name"}
            name={"firstName*"}
            required
            type={"text"}
          />
          <ControlledTextField
            control={control}
            label={"Last Name"}
            name={"lastName*"}
            required
            type={"text"}
          />
          <div className={s.selectors}>
            <Select
              className={s.general}
              items={[]}
              label={"Select your country"}
              onChange={() => {}}
            />
            <Select
              className={s.general}
              items={[]}
              label={"Select your city"}
              onChange={() => {}}
            />
          </div>
          <ControlledTextArea
            control={control}
            label={"About Me"}
            name={"textArea"}
            placeholder={"Text-area"}
          />
        </div>
      </div>
      <Button className={s.button}>Save Changes</Button>
    </div>
  );
};
