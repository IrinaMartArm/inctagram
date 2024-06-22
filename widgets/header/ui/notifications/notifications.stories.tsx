import type { Meta, StoryObj } from '@storybook/react'

import { Notifications } from './notifications'

const meta = {
  argTypes: {},
  component: Notifications,
  tags: ['autodocs'],
  title: 'Components/Notifications',
} satisfies Meta<typeof Notifications>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithMessages: Story = {
  args: { notificationsCount: 5 },
}
