import type { Meta, StoryObj } from "@storybook/react";

import { SignInCard } from "./SignIn";

const meta = {
  argTypes: {},
  component: SignInCard,
  tags: ["autodocs"],
  title: "Widgets/SignIn",
} satisfies Meta<typeof SignInCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignInForm: Story = {
  args: {},
};
