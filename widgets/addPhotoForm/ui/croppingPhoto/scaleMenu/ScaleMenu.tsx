import React, { useState } from 'react'

import { useAppDispatch } from '@/bll/store'
import { addPhotoActions } from '@/entities'
import { InvertedRectangle, PictureWithoutBackGround, Rectangle, Square } from '@/public'
import { Button, Typography } from '@/shared/components'
import { clsx } from 'clsx'

import s from './scaleMenu.module.scss'
type Props = {
  ind: number
}
const buttonArr = [
  {
    active: false,
    aspect: 1,
    svg: <PictureWithoutBackGround />,
    text: 'Оригинал',
  },
  { active: false, aspect: 1, svg: <Square />, text: '1:1' },
  {
    active: false,
    aspect: 5 / 9,
    svg: <Rectangle />,
    text: '4:5',
  },
  {
    active: false,
    aspect: 16 / 9,
    svg: <InvertedRectangle />,
    text: '16:9',
  },
]

export const ScaleMenu = ({ ind }: Props) => {
  const [arrayButton, setArrayButton] = useState(buttonArr)
  const dispatch = useAppDispatch()
  const handleButtonClick = (index: number, aspect: number) => {
    dispatch(
      addPhotoActions.setOptions({
        aspect: aspect,
        index: ind,
        options: 'aspect',
      })
    )

    const updatedArrayButton = arrayButton.map((btn, i) => ({
      ...btn,
      active: i === index,
    }))

    setArrayButton(updatedArrayButton)
  }
  const buttons = arrayButton.map((el, index) => {
    const styleButton = clsx(s.scaleMenuButton, el.active && s.scaleMenuButtonActive)
    const styleButtons = clsx(s.scaleMenuButtons, el.active && s.scaleMenuButtonsActive)

    return (
      <Button
        className={index === 0 ? styleButton : styleButtons}
        fullWidth
        key={index}
        onClick={() => handleButtonClick(index, el.aspect)}
        variant={'link'}
      >
        <Typography variant={'h3'}>{el.text}</Typography>
        {el.svg}
      </Button>
    )
  })

  return <div className={s.container}>{buttons}</div>
}
