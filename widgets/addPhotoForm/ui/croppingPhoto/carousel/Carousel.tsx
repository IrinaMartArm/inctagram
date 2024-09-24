import React, { ReactNode, useState } from 'react'
import Slider from 'react-slick'

import { RootState, useAppSelector } from '@/bll/store'
import { image } from '@/entities'
import { NextArrowComponent } from '@/shared/components/arrows/NextArrowComponent'
import { PrevArrowComponent } from '@/shared/components/arrows/PrevArrowComponent'
import { useAddPhotoForm } from '@/widgets/addPhotoForm/hooks'
import { EasyCrop } from '@/widgets/addPhotoForm/ui/croppingPhoto/easyCrop/easyCrop'
import { clsx } from 'clsx'

import 'slick-carousel/slick/slick.css'

import s from './carousel.module.scss'
type Props = {
  ind: number
  setInd: (ind: number) => void
  setShowMenu: (val: string) => void
}
export const Carousel = ({ ind, setInd, setShowMenu }: Props) => {
  const { showCroppedImage } = useAddPhotoForm()
  const { images } = useAppSelector((state: RootState) => state.addPhoto)
  const settings = {
    appendDots: (dots: ReactNode) => <ul className={s.dots}>{dots}</ul>,
    beforeChange: (current: any, next: any) => setInd(next),
    customPaging: (i: number) => (
      <div className={clsx(s.dotsItem, { [s.dotsItemActive]: i === ind })}></div>
    ),
    dots: images.length > 1,
    dotsClass: `${s.dots}`,
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
    showCroppedImage(ind)
  }

  const ecropp = images?.map((e, ind) => {
    return (
      <EasyCrop
        aspect={e.aspect}
        croppedArea={e.croppedArea}
        image={e.image}
        ind={ind}
        key={ind}
        setShowMenu={setShowMenu}
        zoom={e.zoom}
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
