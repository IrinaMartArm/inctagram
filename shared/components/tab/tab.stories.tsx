import type { Meta, StoryObj } from '@storybook/react'

import { Tab } from './Tab'

const meta = {
  argTypes: {
    onChange: { action: 'change checked' },
  },
  component: Tab,
  tags: ['autodocs'],
  title: 'Components/Tab',
} satisfies Meta<typeof Tab>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 'tab-01',
    label: 'Select tab',
    options: [
      { disabled: false, path: ' ', title: 'Tabs', value: 'tab-01' },
      { disabled: false, path: ' ', title: 'Tabs', value: 'tab-02' },
    ],
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: 'tab-03',
    label: 'Select tab',
    options: [
      { disabled: true, path: ' ', title: 'Tabs', value: 'tab-03' },
      { disabled: true, path: ' ', title: 'Tabs', value: 'tab-04' },
      { disabled: true, path: ' ', title: 'Tabs', value: 'tab-05' },
    ],
  },
}
