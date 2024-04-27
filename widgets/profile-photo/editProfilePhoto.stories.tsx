import type { Meta, StoryObj } from "@storybook/react";

import { EditProfilePhoto } from "./EditProfilePhoto";

const meta = {
  argTypes: {},
  component: EditProfilePhoto,
  tags: ["autodocs"],
  title: "Widgets/EditProfilePhoto",
} satisfies Meta<typeof EditProfilePhoto>;

export default meta;
type Story = StoryObj<typeof meta>;

const PHOTO =
  "https://png.pngtree.com/thumb_back/fw800/background/20230527/pngtree-cute-little-dog-sitting-in-the-field-image_2689739.jpg";

export const Default: Story = {
  args: {
    defaultOpen: true,
    photo: PHOTO,
    title: "Add a Profile Photo",
  },
};

export const WithError: Story = {
  args: {
    defaultOpen: true,
    error: "The format of the uploaded photo must be\n" + "PNG and JPEG",
    photo: PHOTO,
    title: "Add a Profile Photo",
  },
};
