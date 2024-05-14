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
    selected: "",
    setSelected: (selected: string) => {},
  },
  render: (args) => {
    const [selected, setSelected] = useState<string>("");

    return (
      <>
        <DayPicker
          selected={selected}
          setSelected={setSelected}
        />
      </>
    );
  },
};