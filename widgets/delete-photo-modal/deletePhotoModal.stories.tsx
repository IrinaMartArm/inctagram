import type { Meta, StoryObj } from "@storybook/react";

import { DeletePhotoModal } from "./DeletePhotoModal";

const meta = {
  argTypes: {},
  component: DeletePhotoModal,
  tags: ["autodocs"],
  title: "Widgets/DeletePhotoModal",
} satisfies Meta<typeof DeletePhotoModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultOpen: true,
    deletePhoto: () => {},
    setIsShowModal: () => {},
    text: "Do you really want to delete your profile photo?",
    title: "Delete Photo",
  },
};
