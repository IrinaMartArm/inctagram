import { PayloadAction, createSlice } from '@reduxjs/toolkit'
type CropImageWithFilter = {
  filter: string
  img: string
}
type croppedAreaPixelsType = { height: number; width: number; x: number; y: number }
type croppedAreaType = { x: number; y: number }
export type image = {
  aspect: number
  croppedArea: croppedAreaType
  croppedAreaPixels: croppedAreaPixelsType | null
  image: string
  zoom: number
}
export type ModalState = 'add-photo' | 'cropping' | 'filters' | 'publication'
const slice = createSlice({
  initialState: {
    cropImages: [] as string[],
    cropImagesWithFilter: [] as CropImageWithFilter[],
    images: [] as image[],
    isOpen: false as boolean,
    modalState: 'add-photo' as ModalState,
  },
  name: 'addPhotoSlice',
  reducers: {
    addCropImage: (state, action: PayloadAction<{ cropImage: string; cropImageIndex: number }>) => {
      const { cropImage, cropImageIndex } = action.payload

      state.cropImages[cropImageIndex] = cropImage
      state.cropImagesWithFilter[cropImageIndex] = {
        filter: 'none',
        img: cropImage,
      }
    },
    addImage: (state, action: PayloadAction<string>) => {
      state.images.push({
        aspect: 1,
        croppedArea: { x: 0, y: 0 },
        croppedAreaPixels: null,
        image: action.payload,
        zoom: 1,
      })
      state.cropImages.push(action.payload)
      state.cropImagesWithFilter.push({
        filter: 'none',
        img: action.payload,
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
        cropImageWithFilter: string
        cropImageWithFilterIndex: number
        filter: string
      }>
    ) => {
      const { cropImageWithFilter, cropImageWithFilterIndex, filter } = action.payload

      state.cropImagesWithFilter[cropImageWithFilterIndex] = {
        filter: filter,
        img: cropImageWithFilter,
      }
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
    setModalStateTo: (state, action: PayloadAction<ModalState>) => {
      state.modalState = action.payload
    },
    setOptions: (
      state,
      action: PayloadAction<{
        aspect?: number
        croppedArea?: croppedAreaType
        croppedAreaPixels?: croppedAreaPixelsType
        index: number
        options: 'aspect' | 'croppedArea' | 'croppedAreaPixels' | 'zoom'
        zoom?: number
      }>
    ) => {
      const { index, options } = action.payload
      const image = state.images[index]

      if (options in image) {
        //@ts-ignore
        image[options] = action.payload[options]
      }
    },
  },
})

export const addPhotoReducers = slice.reducer
export const addPhotoActions = slice.actions
