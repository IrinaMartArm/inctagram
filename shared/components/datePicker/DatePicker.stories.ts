import type { Meta, StoryObj } from "@storybook/react";

import { DatePicker } from "./";

const meta = {
  argTypes: {},
  component: DatePicker,
  tags: ["autodocs"],
  title: "Components/DatePicker",
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DatePickerDemo: Story = {
  args: {},
};
