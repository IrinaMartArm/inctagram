import type { Meta, StoryObj } from "@storybook/react";

import boy from "@/public/images/Boy.png";
import flag from "@/public/images/FlagRussia.svg";
import { Avatar } from "@/shared/components";

const meta = {
  argTypes: {},
  component: Avatar,
  tags: ["autodocs"],
  title: "Components/Avatar",
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    alt: "Some alt",
    src: boy.src,
    variant: "lg",
  },
};
export const Medium: Story = {
  args: {
    alt: "Some alt",
    src: "data:image/webp;base64,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",
    variant: "md",
  },
};
export const Small: Story = {
  args: {
    alt: "Some alt",
    src: flag.src,
    variant: "sm",
  },
};
