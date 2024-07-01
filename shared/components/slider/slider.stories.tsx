import { useState } from 'react'

import { Slider, SliderProps } from '@/shared/components/slider/Slider'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Slider> = {
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
}

export default meta
type Story = StoryObj<typeof meta>

const SliderWithHooks = (args: SliderProps) => {
  const [value, setValue] = useState(args.value)

  const handleOnValueChange = (value: number[]) => {
    setValue(value)
  }

  return <Slider {...args} onValueChange={handleOnValueChange} value={value} />
}

export const Defaults: Story = {
  args: {
    min: 0,
    step: 1,
    value: [0, 4],
  },
  render: args => <SliderWithHooks {...args} />,
}
