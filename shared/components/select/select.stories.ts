import { items } from '@/App'
import { Select } from '@/components/ui/select/Select'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    items: items,
  },
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const SelectDemo: Story = {
  args: {
    items: items,
    name: 'select',
  },
}
