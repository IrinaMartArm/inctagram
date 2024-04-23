import { FC } from "react";

import { Typography } from "@/shared/components";
import * as Tabs from "@radix-ui/react-tabs";

import s from "./tab.module.scss";

export type TabOptions = {
  disabled: boolean;
  title: string;
  value: string;
};

type Props = {
  defaultValue?: string;
  disabled?: boolean;
  label?: string;
  onChange?: (value: string) => void;
  options: TabOptions[];
  value?: string;
};

export const Tab: FC<Props> = ({
  defaultValue,
  disabled,
  label,
  onChange,
  options,
  value,
}) => (
  <Tabs.Root
    className={s.root}
    defaultValue={defaultValue}
    onValueChange={onChange}
    value={value}
  >
    <Tabs.List aria-label={label}>
      {options.map((option) => (
        <Tabs.Trigger
          className={s.tabsTrigger}
          disabled={option.disabled || disabled}
          key={option.value}
          value={option.value}
        >
          <Typography variant={"h3"}>{option.title}</Typography>
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  </Tabs.Root>
);
