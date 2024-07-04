import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ModalState, addPhotoActions } from '@/entities'
import { Paths } from '@/shared/assets'
import {
  useAddPostMutation,
  useGetImgIdMutation,
  useGetPostQuery,
} from '@/shared/assets/api/post/post-api'
import { PostItemType } from '@/shared/assets/api/post/types'
import { RootState, useAppDispatch, useAppSelector } from '@/shared/assets/api/store'
import { convertFileToBase64, getCroppedImg } from '@/shared/assets/helpers'
import { filteredImg } from '@/shared/assets/helpers/getImgWithFilter'
import { useTranslation } from '@/shared/assets/hooks/useTranslation'
import { CropArg } from '@/shared/assets/types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

export const useAddPhotoForm = () => {
  const dispatch = useAppDispatch()
  const { cropImages, cropImagesWithFilter, images, isOpen, isPostCreated, modalState, post } =
    useAppSelector((state: RootState) => state.addPhoto)
  const { t } = useTranslation()
  const [errorFile, setErrorFile] = useState<null | string>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [aspect, setAspect] = useState(1)
  const [zoomValue, setZoomValue] = useState([1, 3])
  const menu = 'scale-menu' || 'zoom-menu' || 'add-photos-menu'
  const [showMenu, setShowMenu] = useState<string | typeof menu>('')
  const router = useRouter()
  const [getImgId] = useGetImgIdMutation()
  const [addPost] = useAddPostMutation()
  const imgChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size > 20 * 1024 * 1024) {
        setErrorFile(`File size exceeds ${20} MB`)

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
      console.error(e)
    }
  }
  const formData = new FormData()

  function checkImageSize(file: any) {
    // Проверка размера файла
    const maxFileSize = 20 * 1024 * 1024 // 20 MB

    if (file.size > maxFileSize) {
      console.log('Размер изображения превышает 20 MB.')

      return
    }

    // Проверка формата файла
    function getImageType(file: any) {
      const signature = new Uint8Array(file.slice(0, 4))
      const signatureString = Array.from(signature)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('')

      switch (signatureString) {
        case '89504e47':
          return 'png'
        case 'ffd8ff':
          return 'jpg'
        // Добавьте другие форматы, если необходимо
        default:
          return 'unknown'
      }
    }

    const imageType = getImageType(file)

    if (imageType === 'png') {
      console.log('Изображение соответствует требованиям: размер меньше 20 MB, формат PNG.')
    } else if (imageType === 'jpg') {
      console.log('Изображение соответствует требованиям: размер меньше 20 MB, формат JPG.')
    } else {
      console.log('Формат изображения не соответствует требованиям (должен быть PNG или JPG).')
    }
  }
  const showFilteredImage = async (index: number | undefined, activeFilter: string) => {
    try {
      const croppedImage = await filteredImg(cropImages[index as number], activeFilter)

      if (croppedImage) {
        const croppedImageURL = URL.createObjectURL(croppedImage)

        checkImageSize(formData)

        dispatch(
          addPhotoActions.setCropImagesWithFilter({
            cropImageWithFilter: croppedImageURL,
            cropImageWithFilterIndex: index as number,
            filter: activeFilter,
            imgFile: '',
          })
        )
      }
    } catch (e) {
      console.error(e)
    }
  }
  const setModalStateCallback = (modal: ModalState) => {
    dispatch(addPhotoActions.setModalStateTo(modal))
  }
  const descriptionValidation = z.string().min(5, 'Мин').trim().max(500, 'Мах')

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

        console.log(response)

        // Обработка ответа
        return response
      } catch (error) {
        console.error('Ошибка при загрузке изображения:', error)

        // Обработка ошибки
        return null
      }
    })

    const results = await Promise.all(uploadPromises)

    console.log('Все загрузки завершены:', results)
    const imageIds = results
      .filter((el): el is { imageId: string } => el !== null)
      .map(el => el.imageId)
    const payload = {
      description: data.description,
      images: imageIds,
    }

    console.log(payload)
    try {
      const response = await addPost(payload).unwrap()

      if (response !== null) {
        dispatch(addPhotoActions.setIsOpen(false))
        dispatch(addPhotoActions.setIsPostCreated(true))
        dispatch(addPhotoActions.setPost(response))

        console.log('Пост успешно отправлен:', response)
      } else {
        console.error('Ответ от addPost является null')
      }
    } catch (error) {
      console.error('Ошибка при отправке поста:', error)
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
    isPostCreated,
    modalState,
    onSubmit,
    post,
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
