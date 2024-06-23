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
  images: string[] | undefined
  setShowMenu: (val: string) => void
  zoomValue: number[]
}
export const Carousel = ({ aspect, images, setShowMenu, zoomValue }: Props) => {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArg | null>(null)

  const [ind, setInd] = useState(0)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const { showCroppedImage } = useAddPhotoForm()

  const settings = {
    dots: true,
    draggable: false,
    fade: true,
    infinite: true,
    nextArrow: (
      <NextArrowComponent
        croppedAreaPixels={croppedAreaPixels}
        ind={ind}
        len={images?.length}
        setInd={setInd}
      />
    ),
    prevArrow: (
      <PrevArrowComponent
        croppedAreaPixels={croppedAreaPixels}
        ind={ind}
        len={images?.length}
        setInd={setInd}
      />
    ),
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 500,
    // swipeToSlide: false,
    waitForAnimate: false,
  }

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
      <Slider
        className={`${s.slider} slick-list`}
        {...settings}
        afterChange={() => showCroppedImage(ind, croppedAreaPixels)}
      >
        {ecropp}
      </Slider>
    </>
  )
}
