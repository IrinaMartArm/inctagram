import type { Meta, StoryObj } from "@storybook/react";

import { Provider } from "react-redux";

import { store } from "@/shared/assets/api/store";
import { MainSideBar } from "@/widgets";

const meta = {
  argTypes: {},
  component: MainSideBar,
  tags: ["autodocs"],
  title: "Widgets/MainSideBar",
} satisfies Meta<typeof MainSideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};
