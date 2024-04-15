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

export const DayPickerDemo: Story = {
  args: {},
};
