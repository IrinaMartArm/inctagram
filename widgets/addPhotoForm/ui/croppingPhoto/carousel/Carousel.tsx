import React, { useState } from 'react'
import Slider from 'react-slick'

import { CropArg } from '@/shared/assets/types/types'
import { NextArrowComponent } from '@/shared/components/arrows/NextArrowComponent'
import { PrevArrowComponent } from '@/shared/components/arrows/PrevArrowComponent'
import { useAddPhotoForm } from '@/widgets/addPhotoForm/hooks'
import { EasyCrop } from '@/widgets/addPhotoForm/ui/croppingPhoto/easyCrop/easyCrop'

import 'slick-carousel/slick/slick.css'

import s from './carousel.module.scss'
type Props = {
  aspect: number

  croppedAreaPixels: CropArg | null
  images: string[]
  ind: number
  setCroppedAreaPixels: (croppedAreaPixels: CropArg | null) => void
  setInd: (ind: number) => void
  setShowMenu: (val: string) => void
  setZoomValue: (val: number[]) => void
  zoomValue: number[]
}
export const Carousel = ({
  aspect,
  croppedAreaPixels,
  images,
  ind,
  setCroppedAreaPixels,
  setInd,
  setShowMenu,
  setZoomValue,
  zoomValue,
}: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const { showCroppedImage } = useAddPhotoForm()

  const settings = {
    dots: true,
    draggable: false,
    fade: true,
    infinite: true,
    nextArrow: <NextArrowComponent ind={ind} len={images?.length} setInd={setInd} />,
    prevArrow: <PrevArrowComponent ind={ind} len={images?.length} setInd={setInd} />,
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 500,
    waitForAnimate: false,
  }
  const handleCropPixels = (e: any) => {
    console.log(e)
    showCroppedImage(ind, croppedAreaPixels)
    // setCroppedAreaPixels()
    setCrop({ x: 0, y: 0 })
    setZoomValue([1, 3])
  }

  // console.log(crop)
  const ecropp = images?.map((e, ind) => {
    return (
      <EasyCrop
        aspect={aspect}
        crop={crop}
        image={e}
        key={ind}
        setCrop={setCrop}
        setCroppedAreaPixels={setCroppedAreaPixels}
        setShowMenu={setShowMenu}
        zoom={zoomValue[0]}
      />
    )
  })

  return (
    <>
      <Slider className={`${s.slider} slick-list`} {...settings} afterChange={handleCropPixels}>
        {ecropp}
      </Slider>
    </>
  )
}
