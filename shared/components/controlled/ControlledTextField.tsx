import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import { Input, InputProps } from "@/shared/components";

type PropsType<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  "defaultValue" | "disabled" | "rules"
> &
  Omit<InputProps, "onChange" | "value">;
export const ControlledTextField = <T extends FieldValues>({
  control,
  label,
  shouldUnregister,
  ...rest
}: PropsType<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    disabled: rest.disabled,
    name: rest.name,
    shouldUnregister,
  });

  return (
    <Input {...rest} {...field} errorMessage={error?.message} label={label} />
  );
};
