import { PostItemType } from '@/shared/assets/api/post/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { boolean } from 'zod'
type CropImageWithFilter = {
  filter: string
  img: string
  imgFile: any
}
export type ModalState = 'add-photo' | 'cropping' | 'filters' | 'publication'
const slice = createSlice({
  initialState: {
    cropImages: ([] as string[]) || null,
    cropImagesWithFilter: ([] as CropImageWithFilter[]) || null,
    images: ([] as string[]) || null,
    isOpen: false as boolean,
    isPostCreated: false as boolean,
    modalState: 'add-photo' as ModalState,
    post: {} as PostItemType,
  },
  name: 'addPhotoSlice',
  reducers: {
    addCropImage: (state, action: PayloadAction<{ cropImage: string; cropImageIndex: number }>) => {
      const { cropImage, cropImageIndex } = action.payload

      state.cropImages[cropImageIndex] = cropImage
      state.cropImagesWithFilter[cropImageIndex] = {
        filter: 'none',
        img: cropImage,
        imgFile: '',
      }
    },
    addImage: (state, action: PayloadAction<string>) => {
      state.images.push(action.payload)
      state.cropImages.push(action.payload)
      state.cropImagesWithFilter.push({
        filter: 'none',
        img: action.payload,
        imgFile: '',
      })
    },
    discardAll: state => {
      state.modalState = 'add-photo'
      state.images = []
      state.cropImages = []
      state.cropImagesWithFilter = []
    },
    removeImage: (state, action: PayloadAction<number>) => {
      state.images.splice(action.payload, 1)
      state.cropImages.splice(action.payload, 1)
      state.cropImagesWithFilter.splice(action.payload, 1)
    },
    setCropImagesWithFilter: (
      state,
      action: PayloadAction<{
        cropImageWithFilter: any
        cropImageWithFilterIndex: number
        filter: string
        imgFile: any
      }>
    ) => {
      const { cropImageWithFilter, cropImageWithFilterIndex, filter, imgFile } = action.payload

      state.cropImagesWithFilter[cropImageWithFilterIndex] = {
        filter: filter,
        img: cropImageWithFilter,
        imgFile: imgFile,
      }
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
    setIsPostCreated: (state, action: PayloadAction<boolean>) => {
      state.isPostCreated = action.payload
    },
    setModalStateTo: (state, action: PayloadAction<ModalState>) => {
      state.modalState = action.payload
    },
    setPost: (state, action: PayloadAction<PostItemType>) => {
      state.post = action.payload
    },
  },
})

export const addPhotoReducers = slice.reducer
export const addPhotoActions = slice.actions
