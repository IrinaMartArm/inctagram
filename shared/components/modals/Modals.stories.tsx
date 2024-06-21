import { Button, CheckBox, Input, Select, Typography } from '@/shared/components'
import { Meta, StoryObj } from '@storybook/react'

import { Modal } from './Modals'

const meta: Meta<typeof Modal> = {
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Modal',
}

export default meta
type Story = StoryObj<typeof meta>

export const ModalWithTitle: Story = {
  args: {
    defaultOpen: false,
    title: 'title',
    trigger: <Button>Open modal</Button>,
  },
}

export const ModalWithChildren: Story = {
  args: {
    children: (
      <div style={{ padding: '18px 24px' }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor eos error explicabo fugiat
        laborum minus, modi non praesentium quaerat quibusdam ratione reiciendis, tempora vel.
        Accusantium consequatur ex excepturi fugit, impedit ipsum laboriosam nihil quaerat quibusdam
        saepe, sequi, velit? Atque dolor ducimus ea est mollitia, natus nihil quam quibusdam quos
        voluptatem?
      </div>
    ),
    defaultOpen: false,
    trigger: <Button>Open modal</Button>,
  },
}

const options = [
  { title: '1', value: 'title1' },
  { title: '2', value: 'title2' },
  { title: '3', value: 'title3' },
  { title: '4', value: 'title4' },
]

export const ModalWithSelectAndInput: Story = {
  args: {
    children: (
      <div
        style={{
          padding: '18px 24px',
          width: '100%',
        }}
      >
        <Select items={options} label={'Select-box'} onChange={() => {}} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            marginTop: '24px',
          }}
        >
          <Input label={'Input'} type={'text'} value={'Input'} />
          <Input label={'Input'} type={'text'} value={'Input'} />
          <CheckBox checked label={'check-box'} />
        </div>
      </div>
    ),
    defaultOpen: false,
    trigger: <Button>Open modal</Button>,
  },
}

export const ModalQuestion: Story = {
  args: {
    children: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          padding: '18px 24px',
          width: '100%',
        }}
      >
        <Typography variant={'h2'}>example</Typography>
      </div>
    ),
    defaultOpen: false,
    trigger: <Button>Open modal</Button>,
  },
}

export const ModalFooter: Story = {
  args: {
    children: (
      <div
        style={{
          display: 'flex',
          gap: '30px',
          padding: '18px 24px',
        }}
      >
        <Button variant={'secondary'}>Button Secondary</Button>
        <Button variant={'primary'}>Button primary</Button>
      </div>
    ),
    defaultOpen: false,
    trigger: <Button>Open modal</Button>,
  },
}

export const ModalFullExample: Story = {
  args: {
    children: (
      <div
        style={{
          padding: '18px 24px',
          width: '100%',
        }}
      >
        <Select items={options} label={'Select-box'} onChange={() => {}} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            marginTop: '24px',
          }}
        >
          <Input label={'Input'} type={'text'} value={'Input'} />
          <Input label={'Input'} type={'text'} value={'Input'} />
          <CheckBox checked label={'check-box'} />
        </div>
        <div
          style={{
            display: 'flex',
            gap: '30px',
            marginTop: '36px',
          }}
        >
          <Button variant={'secondary'}>Button Secondary</Button>
          <Button variant={'primary'}>Button primary</Button>
        </div>
      </div>
    ),
    defaultOpen: false,
    title: 'title',
    trigger: <Button>Open modal</Button>,
  },
}
