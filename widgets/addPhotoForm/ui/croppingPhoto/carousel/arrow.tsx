import React from 'react'

import { NextArrow, PrevArrow } from '@/public'
import { CropArg } from '@/shared/assets/types/types'
import { Button } from '@/shared/components'

import s from '@/widgets/addPhotoForm/ui/croppingPhoto/carousel/carousel.module.scss'
type Props = {
  callbackFunction?: () => void
  croppedAreaPixels?: CropArg | null
  ind: number
  len?: number
  onClick?: () => void
  setInd: (val: number) => void
}
export const PrevArrowComponent = ({ callbackFunction, ind, len, onClick, setInd }: Props) => {
  if (ind === 0 || (len ? len : 0) <= 1) {
    return null
  }
  const handleClick = () => {
    setInd(ind - 1)
    if (callbackFunction) {
      callbackFunction()
    }
    if (onClick) {
      onClick()
    }
  }

  return (
    <Button className={s.prevArrow} onClick={handleClick} variant={'icon'}>
      <PrevArrow />
    </Button>
  )
}
export const NextArrowComponent = ({ callbackFunction, ind, len, onClick, setInd }: Props) => {
  console.log('render')
  if (ind === (len ? len - 1 : 0) || (len ? len : 0) <= 1) {
    return null
  }
  const handleClick = () => {
    setInd(ind + 1)
    if (callbackFunction) {
      callbackFunction()
    }
    if (onClick) {
      onClick()
    }
  }

  return (
    <Button className={s.nextArrow} onClick={handleClick} variant={'icon'}>
      <NextArrow />
    </Button>
  )
}
