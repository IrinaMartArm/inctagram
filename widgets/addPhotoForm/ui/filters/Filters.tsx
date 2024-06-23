import React, { useState } from 'react'
import Slider from 'react-slick'

import { addPhotoActions } from '@/entities'
import { ArrowBack } from '@/public'
import { useAppDispatch } from '@/shared/assets/api/store'
import { Button, NextArrowComponent, PrevArrowComponent, Typography } from '@/shared/components'
import { useAddPhotoForm } from '@/widgets/addPhotoForm/hooks'

import s from './filters.module.scss'
export const filtersVariant = [
  {
    filter: 'none',
    name: 'Normal',
  },
  {
    filter: 'invert(80%)',
    name: 'Clarendon',
  },
  {
    filter: 'grayscale(100%)',
    name: 'Lark',
  },
  {
    filter: 'contrast(160%)',
    name: 'Gingham',
  },
  {
    filter: 'brightness(1.2) saturate(1.3)',
    name: 'Sunshine',
  },
  {
    filter: 'sepia(60%) contrast(1.1) brightness(0.9)',
    name: 'Vintage',
  },
  {
    filter: 'grayscale(100%) contrast(1.2)',
    name: 'Monochrome',
  },
  {
    filter: 'contrast(2) saturate(1.5)',
    name: 'Vibrant',
  },
  {
    filter: 'brightness(0.8) sepia(0.3)',
    name: 'Warm',
  },
]

export const Filters = () => {
  const { cropImages, cropImagesWithFilter, setModalStateCallback, showFilteredImage, t } =
    useAddPhotoForm()
  const dispatch = useAppDispatch()
  const [filter, setFilter] = useState('')
  const [ind, setInd] = useState(0)

  const handleBackToCropPhoto = () => {
    dispatch(addPhotoActions.setModalStateTo('cropping'))
  }
  const handleNext = () => {
    setModalStateCallback('publication')
  }
  const settings = {
    className: s.sliderContainer,

    draggable: false,
    fade: true,
    infinite: true,
    nextArrow: (
      <NextArrowComponent
        callbackFunction={() => setFilter('')}
        ind={ind}
        len={cropImages?.length}
        setInd={setInd}
      />
    ),
    prevArrow: (
      <PrevArrowComponent
        callbackFunction={() => setFilter('')}
        ind={ind}
        len={cropImages?.length}
        setInd={setInd}
      />
    ),
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 500,
    waitForAnimate: false,
  }
  const cropImage = cropImages.map((img, index) => {
    const actualFilter = filter === '' ? cropImagesWithFilter[index].filter : filter

    return (
      <div className={s.imageContainer} key={index}>
        <img alt={''} src={img} style={{ filter: actualFilter }} />
      </div>
    )
  })
  const filters = filtersVariant.map((f, i) => {
    return (
      <div className={s.filterBlock} key={i} onClick={() => setFilter(f.filter)}>
        <div className={s.filterImgBlock}>
          <img
            alt={''}
            className={s.filterImg}
            src={cropImages[ind]}
            style={{
              filter: f.filter,
            }}
          />
        </div>
        <Typography variant={'regular_text-16'}>{f.name}</Typography>
      </div>
    )
  })

  return (
    <div>
      <div className={s.header}>
        <Button onClick={handleBackToCropPhoto} variant={'icon'}>
          <ArrowBack />
        </Button>
        <Typography className={s.filterTitle} variant={'h1'}>
          {t.addPhotoForm.filters}
        </Typography>
        <Button onClick={handleNext} variant={'link'}>
          <Typography variant={'h3'}>Next</Typography>
        </Button>
      </div>
      <div className={s.filterContainer}>
        <Slider
          {...settings}
          afterChange={() =>
            showFilteredImage(ind, filter === '' ? cropImagesWithFilter[ind].filter : filter)
          }
          className={`${s.slider} slick-list`}
        >
          {cropImage}
        </Slider>
        <div className={s.filtersBlock}>{filters}</div>
      </div>
    </div>
  )
}
