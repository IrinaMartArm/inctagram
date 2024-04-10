import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import { CheckBox, CheckboxProps } from "@/shared/components";

type PropsType<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  "defaultValue" | "disabled" | "rules"
> &
  Omit<CheckboxProps, "checked" | "onCheckedChange">;
export const ControlledCheckBox = <T extends FieldValues>({
  control,
  label,
  shouldUnregister,
  ...rest
}: PropsType<T>) => {
  const {
    field: { onBlur, onChange, ref, value },
  } = useController({
    control,
    disabled: rest.disabled,
    name: rest.name,
    shouldUnregister,
  });

  return (
    <CheckBox
      {...rest}
      checked={value}
      label={label}
      onBlur={onBlur}
      onCheckedChange={onChange}
      ref={ref}
    />
  );
};
