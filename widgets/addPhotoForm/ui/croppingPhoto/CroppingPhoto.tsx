import React, { ChangeEvent, useState } from 'react'

import { addPhotoActions } from '@/entities'
import { ArrowBack, Magnifier, Picture, Vectors } from '@/public'
import { useAppDispatch } from '@/shared/assets/api/store'
import { CropArg } from '@/shared/assets/types/types'
import { Button, Typography } from '@/shared/components'
import { useAddPhotoForm } from '@/widgets/addPhotoForm/hooks'
import { AddPhotosMenu } from '@/widgets/addPhotoForm/ui/croppingPhoto/addPhotosMenu/AddPhotosMenu'
import { Carousel } from '@/widgets/addPhotoForm/ui/croppingPhoto/carousel/Carousel'
import { ScaleMenu } from '@/widgets/addPhotoForm/ui/croppingPhoto/scaleMenu/ScaleMenu'
import { ZoomMenu } from '@/widgets/addPhotoForm/ui/croppingPhoto/zoomMenu/ZoomMenu'

import s from './croppingPhoto.module.scss'
type Props = {
  deleteImgCallback: (ind: number) => void
  imgChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CroppingPhoto = ({ deleteImgCallback, imgChangeCallback }: Props) => {
  const {
    aspect,
    cropImages,
    images,
    setAspect,
    setModalStateCallback,
    setShowMenu,
    setZoomValue,
    showMenu,
    t,
    zoomValue,
  } = useAddPhotoForm()
  const dispatch = useAppDispatch()
  const handleBack = () => {
    dispatch(addPhotoActions.discardAll())
  }
  const handleShowMenu = (menu: string) => {
    menu === showMenu ? setShowMenu('') : setShowMenu(menu)
  }
  const handleNext = () => {
    setModalStateCallback('filters')
  }

  return (
    <div className={s.root}>
      <div className={s.header}>
        <Button onClick={handleBack} variant={'icon'}>
          <ArrowBack />
        </Button>
        <Typography className={s.croppingTitle} variant={'h1'}>
          {t.addPhotoForm.cropping}
        </Typography>
        <Button onClick={handleNext} variant={'link'}>
          <Typography variant={'h3'}>Next</Typography>
        </Button>
      </div>
      <div className={s.imgBlock}>
        <Carousel aspect={aspect} images={images} setShowMenu={setShowMenu} zoomValue={zoomValue} />
      </div>
      <div className={s.controlPanelVectors}>
        <Button onClick={() => handleShowMenu('scale-menu')} variant={'icon'}>
          <Vectors />
        </Button>
      </div>
      <div className={s.controlPanelMagnifier}>
        <Button onClick={() => handleShowMenu('zoom-menu')} variant={'icon'}>
          <Magnifier />
        </Button>
      </div>
      <div className={s.controlPanelImage}>
        <Button onClick={() => handleShowMenu('add-photos-menu')} variant={'icon'}>
          <Picture />
        </Button>
      </div>
      {showMenu == 'scale-menu' && <ScaleMenu setAspect={setAspect} />}
      {showMenu == 'zoom-menu' && <ZoomMenu setZoomValue={setZoomValue} zoomValue={zoomValue} />}
      {showMenu == 'add-photos-menu' && (
        <AddPhotosMenu
          deleteImgCallback={deleteImgCallback}
          images={cropImages}
          imgChangeCallback={imgChangeCallback}
        />
      )}
    </div>
  )
}
