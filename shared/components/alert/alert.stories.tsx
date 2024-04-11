import type { Meta, StoryObj } from "@storybook/react";

import { Alert } from "./Alert";

const meta = {
  argTypes: {
    onClick: { action: "click" },
  },
  component: Alert,
  tags: ["autodocs"],
  title: "Components/Alert",
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {
  args: {
    title: "Server is not available",
    variant: "error",
  },
};

export const Success: Story = {
  args: {
    title: "Your settings are saved",
    variant: "success",
  },
};
