import { Input } from '@/shared/components'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['text', 'password', 'search'],
    },
  },
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    disabled: false,
    placeholder: 'Input',
    type: 'text',
  },
}
export const Password: Story = {
  args: {
    disabled: false,
    placeholder: 'Input',
    type: 'password',
  },
}
export const Search: Story = {
  args: {
    disabled: false,
    placeholder: 'Input',
    type: 'search',
  },
}
