import { FC } from 'react'

import { Button, Typography } from '@/shared/components'
import * as Tabs from '@radix-ui/react-tabs'
import Link from 'next/link'

import s from './tab.module.scss'

export type TabOptions = {
  disabled: boolean
  path: string
  title: string
  value: string
}

type Props = {
  defaultValue?: string
  disabled?: boolean
  label?: string
  onChange?: (value: string) => void
  options: TabOptions[]
  value?: string
}

export const Tab: FC<Props> = ({ defaultValue, disabled, label, onChange, options, value }) => (
  <Tabs.Root className={s.root} defaultValue={defaultValue} onValueChange={onChange} value={value}>
    <Tabs.List aria-label={label} className={s.container}>
      {options.map(option => (
        <Tabs.Trigger
          asChild
          className={s.tabsTrigger}
          disabled={option.disabled || disabled}
          key={option.value}
          value={option.value}
        >
          <Button as={Link} href={option.path} variant={''}>
            <Typography variant={'h3'}>{option.title}</Typography>
          </Button>
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  </Tabs.Root>
)
