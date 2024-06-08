import type { Meta, StoryObj } from "@storybook/react";

import { MobileMenuBar } from "@/widgets";

const meta = {
  argTypes: {},
  component: MobileMenuBar,
  tags: ["autodocs"],
  title: "Widgets/MobileMenuBar",
} satisfies Meta<typeof MobileMenuBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
