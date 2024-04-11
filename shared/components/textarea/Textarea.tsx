import { ChangeEvent, ComponentPropsWithoutRef } from "react";

import clsx from "clsx";

import s from "./textarea.module.scss";

import { Typography } from "../typography";

type Props = {
  className?: string;
  error?: string;
  id?: string;
  isDisabled?: boolean;
  label?: string;
  onChangeValue?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  value: string;
} & ComponentPropsWithoutRef<"textarea">;

export const Textarea = ({
  className,
  error,
  isDisabled,
  onChangeValue,
  placeholder,
  value,
}: Props) => {
  const textAreaClassName = clsx(className && className, error && s.error);

  return (
    <div className={s.textarea}>
      <Typography as={"h2"} variant={"h2"}>
        {placeholder}
      </Typography>

      <textarea
        className={textAreaClassName}
        disabled={isDisabled}
        onChange={onChangeValue}
        placeholder={placeholder}
        value={value}
      />
      <div className={s.error__message}>{error && error}</div>
    </div>
  );
};
