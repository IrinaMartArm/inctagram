import type { Meta, StoryObj } from '@storybook/react'

import { AvatarSimple } from './AvatarSimple'

const meta = {
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'large'],
    },
  },
  component: AvatarSimple,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'components/AvatarSimple',
} satisfies Meta<typeof AvatarSimple>

export default meta

type Story = StoryObj<typeof meta>

export const Small: Story = {
  args: {
    size: 'small',
    src: 'https://avatarko.ru/img/kartinka/18/multfilm_Gubka_Bob_17822.jpg',
    title: 'image',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    src: 'https://avatarko.ru/img/kartinka/18/multfilm_Gubka_Bob_17822.jpg',
    title: 'image',
  },
}

export const WithoutImg: Story = {
  args: {
    size: 'small',
    title: 'TEST',
  },
}
