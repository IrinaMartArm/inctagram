import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'

import { store } from '@/shared/assets/api/store'
import { LogOutModal } from '@/widgets'

const meta = {
  argTypes: {},
  component: LogOutModal,
  tags: ['autodocs'],
  title: 'Widgets/LogOutModal',
} satisfies Meta<typeof LogOutModal>

export default meta
type Story = StoryObj<typeof meta>

export const LogOutModalStory: Story = {
  args: {
    email: 'heeelp@gmail.ru',
  },
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
}
