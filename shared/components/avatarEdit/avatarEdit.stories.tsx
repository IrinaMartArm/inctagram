import type { Meta, StoryObj } from "@storybook/react";

import { AvatarEdit } from "@/shared/components";

const meta = {
  argTypes: {},
  component: AvatarEdit,
  tags: ["autodocs"],
  title: "Components/AvatarEdit",
} satisfies Meta<typeof AvatarEdit>;

export default meta;
type Story = StoryObj<typeof meta>;

const PHOTO =
  "https://png.pngtree.com/thumb_back/fw800/background/20230527/pngtree-cute-little-dog-sitting-in-the-field-image_2689739.jpg";

export const Default: Story = {
  args: {
    image: PHOTO,
  },
};
