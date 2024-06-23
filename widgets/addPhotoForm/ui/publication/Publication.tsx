import React, { useState } from 'react'
import Slider from 'react-slick'

import { addPhotoActions } from '@/entities'
import { ArrowBack } from '@/public'
import { useAppDispatch } from '@/shared/assets/api/store'
import {
  Avatar,
  Button,
  ControlledTextArea,
  Input,
  NextArrowComponent,
  PrevArrowComponent,
  Typography,
} from '@/shared/components'
import { useAddPhotoForm } from '@/widgets/addPhotoForm/hooks'

import s from './publication.module.scss'

export const Publication = () => {
  const dispatch = useAppDispatch()

  const { control, cropImages, cropImagesWithFilter, errors, handleSubmit, onSubmit, t, watch } =
    useAddPhotoForm()

  const [ind, setInd] = useState(0)
  const settings = {
    className: s.sliderContainer,

    draggable: false,
    fade: true,
    infinite: true,
    nextArrow: <NextArrowComponent ind={ind} len={cropImages?.length} setInd={setInd} />,
    prevArrow: <PrevArrowComponent ind={ind} len={cropImages?.length} setInd={setInd} />,
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 500,
    waitForAnimate: false,
  }
  const cropImage = cropImagesWithFilter.map((obj, index) => {
    return (
      <div className={s.imageContainer} key={index}>
        <img alt={''} src={obj.img} />
      </div>
    )
  })

  const handlePublish = () => {
    const form = document.getElementById('descriptionForm') as HTMLFormElement

    if (form) {
      form.requestSubmit()
    }
  }
  const description = watch('description', '')
  const numLetters = description.length
  const handleBackToFilters = () => {
    dispatch(addPhotoActions.setModalStateTo('filters'))
  }

  return (
    <div>
      <div className={s.header}>
        <Button onClick={handleBackToFilters} variant={'icon'}>
          <ArrowBack />
        </Button>
        <Typography className={s.publicationTitle} variant={'h1'}>
          {t.addPhotoForm.publication}
        </Typography>
        <Button onClick={handlePublish} variant={'link'}>
          <Typography variant={'h3'}>{t.addPhotoForm.publish}</Typography>
        </Button>
      </div>
      <div className={s.filterContainer}>
        <Slider {...settings} className={`${s.slider} slick-list`}>
          {cropImage}
        </Slider>
        <div className={s.publicationDescriptionBlock}>
          <div className={s.formBlock}>
            <div className={s.avatarContainer}>
              <Avatar alt={'as'} className={s.avatar} size={'sm'} />
              <Typography variant={'regular_text-16'}>URLProfiele</Typography>
            </div>
            <form id={'descriptionForm'} onSubmit={handleSubmit(onSubmit)}>
              <ControlledTextArea
                autoComplete={'description'}
                control={control}
                error={errors.description?.message}
                // errorMessage={errors.email?.message}
                label={'Add publication descriptions'}
                name={'description'}
                placeholder={'description'}
              />
              <Typography className={s.numLettersText} variant={'small-text'}>
                {numLetters}/500
              </Typography>
            </form>
          </div>
          <div className={s.locationBlock}>
            <Input label={'Add location'} type={'location'} />
            <div>New York</div>
            <div>New York</div>
          </div>
        </div>
      </div>
    </div>
  )
}
