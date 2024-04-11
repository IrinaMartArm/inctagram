import type { Meta, StoryObj } from "@storybook/react";

import { ReCaptcha } from "@/widgets";

const meta = {
  component: ReCaptcha,
  tags: ["autodocs"],
  title: "Widgets/ReCaptcha",
} satisfies Meta<typeof ReCaptcha>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};
export const Checked: Story = {
  args: {
    checked: true,
  },
};
export const Loading: Story = {
  args: {
    loading: true,
  },
};
export const Error: Story = {
  args: {
    error: true,
  },
};
export const Expired: Story = {
  args: {
    expired: true,
  },
};
