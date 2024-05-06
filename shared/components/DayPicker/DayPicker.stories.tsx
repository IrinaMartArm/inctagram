import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";

import { DayPicker } from "./";

const meta = {
  argTypes: {},
  component: DayPicker,
  tags: ["autodocs"],
  title: "Components/DayPicker",
} satisfies Meta<typeof DayPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DayPickerSingle: Story = {
  args: {
    mode: "single",
    selected: "",
    setSelected: (selected: string) => {},
  },
  render: (args) => {
    const [selected, setSelected] = useState<string>("");

    return (
      <>
        <DayPicker
          mode={"single"}
          selected={selected}
          setSelected={setSelected}
        />
      </>
    );
  },
};

export const DayPickerRange: Story = {
  args: {
    mode: "range",
    range: ["", ""],
    setRange: (selected: Array<string>) => {},
  },
  render: (args) => {
    const [range, setRange] = useState<Array<string>>(["", ""]);

    return (
      <>
        <DayPicker mode={"range"} range={range} setRange={setRange} />
      </>
    );
  },
};
