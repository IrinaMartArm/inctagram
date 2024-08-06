import React, { ChangeEvent, useState } from 'react'

import { addPhotoActions } from '@/entities'
import { ArrowBack, Magnifier, Picture, Vectors } from '@/public'
import { CropArg } from '@/shared/assets'
import { useAppDispatch } from '@/shared/assets/api/store'
import { Button, Typography } from '@/shared/components'
import { useAddPhotoForm } from '@/widgets/addPhotoForm/hooks'
import { AddPhotosMenu } from '@/widgets/addPhotoForm/ui/croppingPhoto/addPhotosMenu'
import { Carousel } from '@/widgets/addPhotoForm/ui/croppingPhoto/carousel'
import { ScaleMenu } from '@/widgets/addPhotoForm/ui/croppingPhoto/scaleMenu'
import { ZoomMenu } from '@/widgets/addPhotoForm/ui/croppingPhoto/zoomMenu'

import s from './croppingPhoto.module.scss'

type Props = {
  deleteImgCallback: (ind: number) => void
  imgChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void
  setConfirmOpen: (val: string) => void
}

export const CroppingPhoto = ({ deleteImgCallback, imgChangeCallback, setConfirmOpen }: Props) => {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArg | null>(null)

  const [ind, setInd] = useState(0)
  const {
    aspect,
    cropImages,
    images,
    setAspect,
    setModalStateCallback,
    setShowMenu,
    setZoomValue,
    showCroppedImage,
    showMenu,
    t,
    zoomValue,
  } = useAddPhotoForm()
  const dispatch = useAppDispatch()
  const handleBack = () => {
    setConfirmOpen('back')
  }
  const handleShowMenu = (menu: string) => {
    menu === showMenu ? setShowMenu('') : setShowMenu(menu)
  }

  const handleNext = () => {
    showCroppedImage(ind, croppedAreaPixels)
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
          <Typography variant={'h3'}> {t.addPhotoForm.next}</Typography>
        </Button>
      </div>
      <div className={s.imgBlock}>
        <Carousel
          aspect={aspect}
          croppedAreaPixels={croppedAreaPixels}
          images={images}
          ind={ind}
          setCroppedAreaPixels={setCroppedAreaPixels}
          setInd={setInd}
          setShowMenu={setShowMenu}
          setZoomValue={setZoomValue}
          zoomValue={zoomValue}
        />
      </div>
      <div className={s.controlPanelVectors}>
        <Button onClick={() => handleShowMenu('scale-menu')} variant={'icon'}>
          <Vectors color={showMenu == 'scale-menu' ? '#397DF6' : '#fff'} />
        </Button>
      </div>
      <div className={s.controlPanelMagnifier}>
        <Button onClick={() => handleShowMenu('zoom-menu')} variant={'icon'}>
          <Magnifier color={showMenu == 'zoom-menu' ? '#397DF6' : '#fff'} />
        </Button>
      </div>
      <div className={s.controlPanelImage}>
        <Button onClick={() => handleShowMenu('add-photos-menu')} variant={'icon'}>
          <Picture color={showMenu == 'add-photos-menu' ? '#397DF6' : '#fff'} />
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
