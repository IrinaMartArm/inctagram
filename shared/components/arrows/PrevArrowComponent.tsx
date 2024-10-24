import React from 'react'

import { PrevArrow } from '@/public'
import { CropArg } from '@/shared/assets/types/types'
import { Button } from '@/shared/components'

import s from '@/widgets/addPhotoForm/ui/croppingPhoto/carousel/carousel.module.scss'
type Props = {
  callbackFunction?: () => void
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
