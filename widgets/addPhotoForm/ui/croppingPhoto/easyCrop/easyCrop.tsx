import { useEffect, useRef } from 'react'
import Cropper from 'react-easy-crop'

import { CropArg } from '@/shared/assets/types/types'

type Props = {
  aspect: number
  crop: { x: number; y: number }
  //croppedAreaPixels: ;
  image?: string | undefined
  setCrop: (crop: { x: number; y: number }) => void
  setCroppedAreaPixels: (croppedAreaPixels: CropArg | null) => void
  setShowMenu: (val: string) => void
  zoom: number
}

export const EasyCrop = ({
  aspect,
  crop,
  image,
  setCrop,
  setCroppedAreaPixels,
  setShowMenu,
  zoom,
}: Props) => {
  const onCropComplete = (croppedArea: CropArg, croppedAreaPixels: CropArg) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }
  const cropperRef = useRef<HTMLDivElement>(null)

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
