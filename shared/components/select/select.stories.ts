import { Select } from '@/shared/components'
import { Meta, StoryObj } from '@storybook/react'

const options = [
  {
    img: '/images/FlagUK.svg',
    title: 'English',
    value: 'en',
  },
  {
    img: '/images/FlagRussia.svg',
    title: 'Russian',
    value: 'ru',
  },
]

const meta = {
  argTypes: {
    items: options,
  },
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const SelectDemo: Story = {
  args: {
    items: options,
    name: 'select',
    onChange: () => {},
  },
}
