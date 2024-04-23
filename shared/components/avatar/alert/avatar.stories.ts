import type { Meta, StoryObj } from "@storybook/react";

import boy from "@/public/images/Boy.png";
import flag from "@/public/images/FlagRussia.svg";
import noAva from "@/public/images/noAva.webp";

import { Avatar } from "./Avatar";

const meta = {
  argTypes: {},
  component: Avatar,
  tags: ["autodocs"],
  title: "Components/Avatar",
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AvatarLarge: Story = {
  args: {
    alt: "Some alt",
    src: boy.src,
    variant: "lg",
  },
};
export const AvatarMedium: Story = {
  args: {
    alt: "Some alt",
    src: noAva.src,
    variant: "md",
  },
};
export const AvatarSmall: Story = {
  args: {
    alt: "Some alt",
    src: flag.src,
    variant: "sm",
  },
};
