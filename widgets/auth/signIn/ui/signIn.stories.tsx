import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'

import { store } from '@/bll/store'

import { SignInCard } from './SignIn'
const meta = {
  argTypes: {},
  component: SignInCard,
  tags: ['autodocs'],
  title: 'Widgets/SignIn',
} satisfies Meta<typeof SignInCard>

export default meta
type Story = StoryObj<typeof meta>

export const SignInForm: Story = {
  args: {
    onSubmit: () => {},
  },
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
}
