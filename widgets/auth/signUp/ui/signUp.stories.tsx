import type { Meta, StoryObj } from "@storybook/react";

import { Provider } from "react-redux";

import { store } from "@/shared/assets/api/store";
import { SignUpCard } from "@/widgets";

const meta = {
  argTypes: {},
  component: SignUpCard,
  tags: ["autodocs"],
  title: "Widgets/SignUpCard",
} satisfies Meta<typeof SignUpCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignUpForm: Story = {
  args: {
    isLoading: false,
    onSubmit: () => {},
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};
