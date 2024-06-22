import type { Meta, StoryObj } from '@storybook/react'

import { Loader } from '@/shared/components'

const meta = {
  component: Loader,
  tags: ['autodocs'],
  title: 'Components/Loader',
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
