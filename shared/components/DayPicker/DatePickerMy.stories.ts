import type { Meta, StoryObj } from "@storybook/react";

import { DayPickerMy } from "./";

const meta = {
  argTypes: {},
  component: DayPickerMy,
  tags: ["autodocs"],
  title: "Components/DayPickerMy",
} satisfies Meta<typeof DayPickerMy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DayPickerMyDemo: Story = {
  args: {},
};
