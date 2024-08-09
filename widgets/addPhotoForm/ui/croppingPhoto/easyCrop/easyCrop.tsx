import { useCallback, useEffect, useRef } from 'react'
import Cropper from 'react-easy-crop'

import { addPhotoActions } from '@/entities'
import { useAppDispatch } from '@/shared/assets/api/store'
import { CropArg } from '@/shared/assets/types/types'

type Props = {
  aspect: number
  crop: { x: number; y: number }
  //croppedAreaPixels: ;
  image?: string | undefined
  ind: number
  setCrop: (crop: { x: number; y: number }) => void
  setShowMenu: (val: string) => void
  zoom: number
}

export const EasyCrop = ({ aspect, crop, image, ind, setCrop, setShowMenu, zoom }: Props) => {
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
  const onCropComplete = (croppedArea: CropArg, croppedAreaPixels: CropArg) => {
    dispatch(
      addPhotoActions.setCroppedAreaPixels({ croppedAreaPixels: croppedAreaPixels, index: ind })
    )
  }

  return (
    <div ref={cropperRef}>
      {image && (
        <Cropper
          aspect={aspect}
          crop={crop}
          image={image}
          objectFit={'cover'}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          showGrid
          zoom={zoom}
          zoomWithScroll
        />
      )}
    </div>
  )
}
