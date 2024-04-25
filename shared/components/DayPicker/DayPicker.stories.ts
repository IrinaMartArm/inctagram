import type { Meta, StoryObj } from "@storybook/react";

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
  args: { mode: "single" },
};

export const DayPickerRange: Story = {
  args: { mode: "range" },
};
