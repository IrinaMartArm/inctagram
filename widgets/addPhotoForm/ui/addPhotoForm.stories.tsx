import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'

import { store } from '@/shared/assets/api/store'
import { AddPhotoForm } from '@/widgets'

const meta = {
  argTypes: {},
  component: AddPhotoForm,
  tags: ['autodocs'],
  title: 'Widgets/AddPhotoForm',
} satisfies Meta<typeof AddPhotoForm>

export default meta
type Story = StoryObj<typeof meta>

export const AddPhotoFormStory: Story = {
  args: {
    isTextHidden: false,
  },
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
}
