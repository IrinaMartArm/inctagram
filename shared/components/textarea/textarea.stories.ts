import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Textarea } from './Textarea'

const meta = {
  argTypes: {},
  component: Textarea,
  tags: ['autodocs'],
  title: 'Components/Textarea',
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const TextareaDemo: Story = {
  args: {
    placeholder: 'Sup!!',
    value: '',
  },
}
