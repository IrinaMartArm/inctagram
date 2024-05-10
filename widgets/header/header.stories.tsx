import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./Header";

const meta = {
  argTypes: {
    onChange: { action: "change checked" },
  },
  component: Header,
  tags: ["autodocs"],
  title: "Widgets/Header",
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {},
};
