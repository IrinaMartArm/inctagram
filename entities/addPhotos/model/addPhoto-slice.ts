import { PayloadAction, createSlice } from '@reduxjs/toolkit'
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
    setModalStateTo: (state, action: PayloadAction<ModalState>) => {
      state.modalState = action.payload
    },
  },
})

export const addPhotoReducers = slice.reducer
export const addPhotoActions = slice.actions
