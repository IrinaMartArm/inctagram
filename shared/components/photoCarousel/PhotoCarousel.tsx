import React, { ReactNode, useState } from 'react'
import Slider from 'react-slick'

import { NextArrowComponent, PrevArrowComponent } from '@/shared/components'
import { clsx } from 'clsx'

import s from './photoCarousel.module.scss'

type PhotoCarouselType = {
  className?: string
  height?: string
  photos: string[]
}
export const PhotoCarousel = ({ className, height = '564px', photos }: PhotoCarouselType) => {
  const [ind, setInd] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const settings = {
    appendDots: (dots: ReactNode) => <ul className={s.dots}>{dots}</ul>,
    beforeChange: (current: any, next: any) => setActiveIndex(next),
    customPaging: (i: number) => (
      <div className={clsx(s.dotsItem, { [s.dotsItemActive]: i === activeIndex })}></div>
    ),
    dots: photos?.length > 1,
    dotsClass: `${s.dots}`,
    draggable: false,
    fade: true,
    infinite: true,
    nextArrow: <NextArrowComponent ind={ind} len={photos?.length} setInd={setInd} />,
    prevArrow: <PrevArrowComponent ind={ind} len={photos?.length} setInd={setInd} />,
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 500,
    waitForAnimate: false,
  }
  const carouselData = photos?.map((photo, ind) => {
    return (
      <div key={ind}>
        <div className={s.slickItem} style={{ height }}>
          <img alt={`slide-${ind}`} className={s.slickImg} key={ind} src={photo} />
        </div>
      </div>
    )
  })

  return (
    // <div className={clsx(s.sliderContainer, className)}>
    <Slider className={clsx(s.slider, className)} {...settings}>
      {carouselData}
    </Slider>
    // </div>
  )
}
