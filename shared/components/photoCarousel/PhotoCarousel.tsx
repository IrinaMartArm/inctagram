import React, { useState } from 'react'
import Slider from 'react-slick'

import { NextArrowComponent, PrevArrowComponent } from '@/shared/components'
import { clsx } from 'clsx'

import s from './photoCarousel.module.scss'

type PhotoCarouselType = {
  className?: string
  photos: string[]
}
export const PhotoCarousel = ({ className, photos }: PhotoCarouselType) => {
  const [ind, setInd] = useState(0)
  const settings = {
    dots: true,
    draggable: false,
    fade: true,
    infinite: true,
    nextArrow: <NextArrowComponent ind={ind} len={photos?.length} setInd={setInd} />,
    prevArrow: <PrevArrowComponent ind={ind} len={photos?.length} setInd={setInd} />,
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 500,
    // swipeToSlide: false,
    waitForAnimate: false,
  }
  const carouselData = photos?.map((photo, ind) => {
    return <img alt={''} key={ind} src={photo} />
  })

  return (
    <div className={clsx(s.sliderContainer, className)}>
      <Slider
        className={`${s.slider} slick-list`}
        {...settings}
        //afterChange={() => showCroppedImage(ind, croppedAreaPixels)}
      >
        {carouselData}
      </Slider>
    </div>
  )
}
