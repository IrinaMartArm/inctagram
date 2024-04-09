import type { Meta, StoryObj } from "@storybook/react";

import { LogOut_outline } from "@/public";

import { Button } from "./";

const meta = {
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary", "outlined", "link"],
    },
  },
  component: Button,
  tags: ["autodocs"],
  title: "Components/Button",
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    disabled: false,
    variant: "primary",
  },
};

export const DisabledPrimary: Story = {
  args: {
    children: "Disabled Primary Button",
    disabled: true,
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    disabled: false,
    variant: "secondary",
  },
};

export const DisabledSecondary: Story = {
  args: {
    children: "Disabled Secondary Button",
    disabled: true,
    variant: "secondary",
  },
};

export const Outlined: Story = {
  args: {
    children: "Outlined Button",
    disabled: false,
    variant: "outlined",
  },
};

export const DisabledSOutlined: Story = {
  args: {
    children: "Disabled Outlined Button",
    disabled: true,
    variant: "outlined",
  },
};
export const Link: Story = {
  args: {
    as: "a",
    children: "AsLink",
    disabled: false,
    variant: "link",
  },
};

export const DisabledLink: Story = {
  args: {
    as: "a",
    children: "AsLink",
    disabled: true,
    variant: "link",
  },
};

export const FullWidth: Story = {
  args: {
    children: "Full Width Button",
    disabled: false,
    fullWidth: true,
    icon: <LogOut_outline />,
    variant: "primary",
  },
};
export const FullWidthDisabled: Story = {
  args: {
    children: "Full Width Disabled",
    disabled: true,
    fullWidth: true,
    icon: <LogOut_outline />,
    variant: "primary",
  },
};

export const AsLink: Story = {
  args: {
    children: "AsLink",
    variant: "primary",
  },
};
export const DisabledButtonWithIcon: Story = {
  args: {
    children: "Primary Button",
    icon: <LogOut_outline />,
    variant: "primary",
  },
};
