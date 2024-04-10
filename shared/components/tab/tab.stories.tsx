import type { Meta, StoryObj } from "@storybook/react";

import { Tab } from "./Tab";

const meta = {
  argTypes: {
    onChange: { action: "change checked" },
  },
  component: Tab,
  tags: ["autodocs"],
  title: "Components/Tab",
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: "tab-01",
    label: "Select tab",
    options: [
      { disabled: false, title: "Tabs", value: "tab-01" },
      { disabled: false, title: "Tabs", value: "tab-02" },
    ],
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "tab-03",
    label: "Select tab",
    options: [
      { disabled: true, title: "Tabs", value: "tab-03" },
      { disabled: true, title: "Tabs", value: "tab-04" },
      { disabled: true, title: "Tabs", value: "tab-05" },
    ],
  },
};
