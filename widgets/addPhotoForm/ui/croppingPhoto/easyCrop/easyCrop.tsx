import { useEffect, useRef } from 'react'
import Cropper from 'react-easy-crop'

import { RootState, useAppDispatch, useAppSelector } from '@/bll/store'
import { addPhotoActions } from '@/entities'

type Props = {
  aspect: number
  croppedArea: any
  image?: string | undefined
  ind: number
  setShowMenu: (val: string) => void
  zoom: number
}

export const EasyCrop = ({ aspect, croppedArea, image, ind, setShowMenu, zoom }: Props) => {
  const cropperRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cropperRef.current && cropperRef.current.contains(event.target as Node)) {
        setShowMenu('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [cropperRef, setShowMenu])
  const onCropChange = (croppedArea: { x: number; y: number }) => {
    dispatch(
      addPhotoActions.setOptions({
        croppedArea: croppedArea,
        index: ind,
        options: 'croppedArea',
      })
    )
  }
  const onCropComplete = (
    croppedArea: {
      x: number
      y: number
    },
    croppedAreaPixels: {
      height: number
      width: number
      x: number
      y: number
    }
  ) => {
    dispatch(
      addPhotoActions.setOptions({
        croppedAreaPixels: croppedAreaPixels,
        index: ind,
        options: 'croppedAreaPixels',
      })
    )
  }

  return (
    <div ref={cropperRef}>
      {image && (
        <Cropper
          aspect={aspect}
          crop={croppedArea}
          image={image}
          objectFit={'contain'}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          showGrid
          zoom={zoom}
          zoomWithScroll
        />
      )}
    </div>
  )
}
