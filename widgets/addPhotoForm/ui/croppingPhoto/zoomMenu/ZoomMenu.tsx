import { useState } from 'react'

import { RootState, useAppDispatch, useAppSelector } from '@/bll/store'
import { addPhotoActions } from '@/entities'
import { Slider } from '@/shared/components'

import s from './zoomMenu.module.scss'
type Props = {
  ind: number
}
export const ZoomMenu = ({ ind }: Props) => {
  const zoomValue = useAppSelector((state: RootState) => state.addPhoto.images[ind].zoom)
  const dispatch = useAppDispatch()
  const handleOnValueChange = (value: number[]) => {
    dispatch(
      addPhotoActions.setOptions({
        index: ind,
        options: 'zoom',
        zoom: value[0],
      })
    )
  }

  return (
    <Slider
      className={s.slider}
      max={3}
      min={1}
      onValueChange={handleOnValueChange}
      step={0.1}
      value={[zoomValue]}
    />
  )
}
