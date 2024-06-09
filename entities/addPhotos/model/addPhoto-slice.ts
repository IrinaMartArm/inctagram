import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type CropImageWithFilter = {
  filter: string;
  img: string;
};
export type ModalState = "add-photo" | "cropping" | "filters" | "publication";
const slice = createSlice({
  initialState: {
    cropImages: ([] as string[]) || null,
    cropImagesWithFilter: ([] as CropImageWithFilter[]) || null,
    images: ([] as string[]) || null,
    modalState: "add-photo" as ModalState,
  },
  name: "addPhotoSlice",
  reducers: {
    addCropImage: (
      state,
      action: PayloadAction<{ cropImage: string; cropImageIndex: number }>,
    ) => {
      const { cropImage, cropImageIndex } = action.payload;

      state.cropImages[cropImageIndex] = cropImage;
      state.cropImagesWithFilter[cropImageIndex] = {
        filter: "none",
        img: cropImage,
      };
    },
    addImage: (state, action: PayloadAction<string>) => {
      state.images.push(action.payload);
      state.cropImages.push(action.payload);
      state.cropImagesWithFilter.push({
        filter: "none",
        img: action.payload,
      });
      console.log(state.images?.length);
    },

    removeImage: (state, action: PayloadAction<number>) => {
      state.images.splice(action.payload, 1);
      state.cropImages.splice(action.payload, 1);
      state.cropImagesWithFilter.splice(action.payload, 1);
    },
    setCropImagesWithFilter: (
      state,
      action: PayloadAction<{
        cropImageWithFilter: string;
        cropImageWithFilterIndex: number;
        filter: string;
      }>,
    ) => {
      const { cropImageWithFilter, cropImageWithFilterIndex, filter } =
        action.payload;

      state.cropImagesWithFilter[cropImageWithFilterIndex] = {
        filter: filter,
        img: cropImageWithFilter,
      };
    },
    setModalStateTo: (state, action: PayloadAction<ModalState>) => {
      state.modalState = action.payload;
    },
  },
});

export const addPhotoReducers = slice.reducer;
export const addPhotoActions = slice.actions;
