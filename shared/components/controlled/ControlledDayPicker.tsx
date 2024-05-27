import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import { DayPicker, DayPickerProps } from "@/shared/components/DayPicker";

type PropsType<T extends FieldValues> = UseControllerProps<T> &
  Omit<DayPickerProps, "onChange" /* | "selected"  */ | "setSelected">; /// setSelected

export const ControlledDayPicker = <T extends FieldValues>({
  control,
  defaultValue,
  //label,
  shouldUnregister,
  ...rest
}: PropsType<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue,
    name: rest.name,
    shouldUnregister,
  });

  return (
    <DayPicker
      {...rest}
      /* label={label}
      mode={"single"}
      selected={value} */
      selected={value}
      setSelected={onChange}
    />
  );
};
