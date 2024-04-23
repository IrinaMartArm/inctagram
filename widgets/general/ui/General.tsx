import { useForm } from "react-hook-form";

import {
  Button,
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
        <div className={s.avatar}></div>
        <div className={s.form}>
          <ControlledTextField
            control={control}
            label={"Username*"}
            name={"Username"}
            type={"text"}
          />
          <ControlledTextField
            control={control}
            label={"First Name*"}
            name={"firstName*"}
            type={"text"}
          />
          <ControlledTextField
            control={control}
            label={"Last Name*"}
            name={"lastName*"}
            placeholder={"Last Name*"}
            type={"text"}
          />
          <div className={s.selectors}>
            <Select items={[]} onChange={() => {}} />
            <Select items={[]} onChange={() => {}} />
          </div>
        </div>
      </div>
      <Button className={s.button}>Save Changes</Button>
    </div>
  );
};
