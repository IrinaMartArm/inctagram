import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { ModalState, addPhotoActions } from '@/entities'
import { useAddPostMutation, useGetImgIdMutation } from '@/shared/assets/api/post/post-api'
import { RootState, useAppDispatch, useAppSelector } from '@/shared/assets/api/store'
import { convertFileToBase64, getCroppedImg } from '@/shared/assets/helpers'
import { filteredImg } from '@/shared/assets/helpers/getImgWithFilter'
import { useTranslation } from '@/shared/assets/hooks/useTranslation'
import { CropArg } from '@/shared/assets/types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const useAddPhotoForm = () => {
  const dispatch = useAppDispatch()
  const { cropImages, cropImagesWithFilter, images, isOpen, modalState } = useAppSelector(
    (state: RootState) => state.addPhoto
  )
  const { t } = useTranslation()
  const [errorFile, setErrorFile] = useState<null | string>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [aspect, setAspect] = useState(1)
  const [zoomValue, setZoomValue] = useState([1, 3])
  const menu = 'scale-menu' || 'zoom-menu' || 'add-photos-menu'
  const [showMenu, setShowMenu] = useState<string | typeof menu>('')
  const [getImgId] = useGetImgIdMutation()
  const [addPost] = useAddPostMutation()
  const imgChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size > 20 * 1024 * 1024) {
        toast.error(t.addPhotoForm.fileSize)

        return
      }

      convertFileToBase64(file, (file64: string) => {
        if (images.length < 1) {
          dispatch(addPhotoActions.setModalStateTo('cropping'))
        }
        setErrorFile(null)
        dispatch(addPhotoActions.addImage(file64))
      })
    }
  }
  const deleteImgCallback = (index: number) => {
    dispatch(addPhotoActions.removeImage(index))
    if (images.length <= 1) {
      dispatch(addPhotoActions.setModalStateTo('add-photo'))
    }
  }

  const showCroppedImage = async (index: number | undefined, croppedAreaPixels: CropArg | null) => {
    try {
      const croppedImage = await getCroppedImg({
        imageSrc: images[index as number],
        pixelCrop: croppedAreaPixels,
      })

      dispatch(
        addPhotoActions.addCropImage({
          cropImage: croppedImage as string,
          cropImageIndex: index as number,
        })
      )
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message)
      }
    }
  }

  const showFilteredImage = async (index: number | undefined, activeFilter: string) => {
    try {
      const croppedImage = await filteredImg(cropImages[index as number], activeFilter)

      if (croppedImage) {
        const croppedImageURL = URL.createObjectURL(croppedImage)

        dispatch(
          addPhotoActions.setCropImagesWithFilter({
            cropImageWithFilter: croppedImageURL,
            cropImageWithFilterIndex: index as number,
            filter: activeFilter,
          })
        )
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message)
      }
    }
  }
  const setModalStateCallback = (modal: ModalState) => {
    dispatch(addPhotoActions.setModalStateTo(modal))
  }
  const descriptionValidation = z.string().trim().max(500, 'Мах')

  const addPostSchema = z.object({
    description: descriptionValidation,
  })
  const defaultValues = {
    description: '',
  }
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm<{ description: string }>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(addPostSchema),
  })
  const toggleModal = (value: boolean) => {
    dispatch(addPhotoActions.setIsOpen(value))
  }
  const onSubmit = async (data: { description: string }) => {
    const uploadPromises = cropImages.map(async (el, idx) => {
      const filteredImage = await filteredImg(el, cropImagesWithFilter[idx].filter)

      if (!filteredImage) {
        return null
      }

      const file = new File([filteredImage], 'Name.jpeg', {
        type: 'image/jpeg',
      })

      const formData = new FormData()

      formData.append('file', file)

      try {
        const response = await getImgId(formData).unwrap()

        return response
      } catch (e) {
        if (e instanceof Error) {
          toast.error(e.message)
        }

        return null
      }
    })

    const results = await Promise.all(uploadPromises)

    const imageIds = results
      .filter((el): el is { imageId: string } => el !== null)
      .map(el => el.imageId)
    const payload = {
      description: data.description,
      images: imageIds,
    }

    try {
      const response = await addPost(payload).unwrap()

      if (response !== null) {
        dispatch(addPhotoActions.setIsOpen(false))
        toast.success('Пост успешно отправлен')
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message)
      }
    }
  }

  return {
    aspect,
    control,
    crop,
    cropImages,
    cropImagesWithFilter,
    deleteImgCallback,
    errorFile,
    errors,
    handleSubmit,
    images,
    imgChangeCallback,
    isOpen,
    modalState,
    onSubmit,
    setAspect,
    setCrop,
    setModalStateCallback,
    setShowMenu,
    setZoomValue,
    showCroppedImage,
    showFilteredImage,
    showMenu,
    t,
    toggleModal,
    watch,
    zoomValue,
  }
}
