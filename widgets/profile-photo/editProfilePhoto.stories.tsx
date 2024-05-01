import type { Meta, StoryObj } from "@storybook/react";

import Girl from "@/public/images/Girl.png";

import { EditProfilePhoto } from "./EditProfilePhoto";

const meta = {
  argTypes: {},
  component: EditProfilePhoto,
  tags: ["autodocs"],
  title: "Widgets/EditProfilePhoto",
} satisfies Meta<typeof EditProfilePhoto>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultOpen: true,
    setIsShowModal: () => {},
    title: "Add a Profile Photo",
    updateAvatar: () => {},
  },
};

export const WithError: Story = {
  args: {
    defaultOpen: true,
    error: "The format of the uploaded photo must be\n" + "PNG and JPEG",
    setIsShowModal: () => {},
    title: "Add a Profile Photo",
    updateAvatar: () => {},
  },
};

export const WithEditor: Story = {
  args: {
    defaultOpen: true,
    isShowAvatarEditor: true,
    photo: Girl.src,
    setIsShowModal: () => {},
    title: "Add a Profile Photo",
    updateAvatar: () => {},
  },
};
