import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./Header";

const meta = {
  argTypes: {},
  component: Header,
  tags: ["autodocs"],
  title: "Widgets/Header",
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { isAuth: true },
};

export const Disabled: Story = {
  args: { isAuth: false },
};
