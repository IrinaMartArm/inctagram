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

const renderDayPicker = (isSuperMode: boolean) => (args: DayPickerProps) => {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className={s.inputSingleContainer}>
      <DayPicker
        selected={selected}
        setSelected={setSelected}
        isSuperMode={isSuperMode}
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
  render: renderDayPicker(false),
};

export const DayPickerSingleSuper: Story = {
  args: commonArgs,
  render: renderDayPicker(true),
};
