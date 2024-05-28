import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {DayPicker, DayPickerProps} from "./"
import s from './DayPicker.module.scss';

const meta = {
  argTypes: {},
  component: DayPicker,
  tags: ["autodocs"],
  title: "Components/DayPicker",
} satisfies Meta<typeof DayPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderDayPicker = (errorText?: string, label?: string) => (args: DayPickerProps) => {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className={s.inputSingleContainer}>
      <DayPicker
        selected={selected}
        setSelected={setSelected}
        errorText={errorText}
        label={label}
      />
    </div>
  );
};

const commonArgs = {
  selected: "",
  setSelected: (selected: string) => {},
};

export const DayPickerSingle: Story = {
  args: commonArgs,
  render: renderDayPicker(),
};

export const DayPickerCustomError: Story = {
  args: commonArgs,
  render: renderDayPicker('A user under 13 cannot create a profile. Privacy Policy'),
};

export const DayPickerWithLabel: Story = {
  args: commonArgs,
  render: renderDayPicker('', 'Date select'),
};
