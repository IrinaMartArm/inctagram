import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import { Select, SelectType } from "../select";

type PropsType<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  "defaultValue" | "disabled" | "rules"
> &
  Omit<SelectType, "value">;

export const ControlledSelect = <T extends FieldValues>({
  control,
  defaultValue,
  items,
  label,
  onChange,
  shouldUnregister,
  ...rest
}: PropsType<T>) => {
  const { field } = useController({
    control,
    disabled: rest.disabled,
    name: rest.name,
    shouldUnregister,
  });

  return (
    <Select
      {...rest}
      {...field}
      defaultValue={defaultValue}
      items={items}
      label={label}
      onChange={onChange}
    />
  );
};
