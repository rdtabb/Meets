import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../types/Types";

interface IInitialState {
  isAddPostPopupOpen: boolean;
  isIconPopupOpen: boolean;
  isEditProfilePopupOpen: boolean;
  isImagePopupOpen: boolean;
  selectedPost: Post | undefined;
}

const initialState: IInitialState = {
  isAddPostPopupOpen: false,
  isIconPopupOpen: false,
  isEditProfilePopupOpen: false,
  isImagePopupOpen: false,
  selectedPost: undefined,
};

const modalSlice = createSlice({
  name: "feature/modal",
  initialState,
  reducers: {
    setSelectedPost(state, { payload }: PayloadAction<Post>) {
      state.selectedPost = payload;
    },
    setAddPostPopup(state, { payload }: PayloadAction<boolean>) {
      state.isAddPostPopupOpen = payload;
    },
    setIconPopup(state, { payload }: PayloadAction<boolean>) {
      state.isIconPopupOpen = payload;
    },
    setEditProfile(state, { payload }: PayloadAction<boolean>) {
      state.isEditProfilePopupOpen = payload;
    },
  },
});

export const {
  setSelectedPost,
  setAddPostPopup,
  setEditProfile,
  setIconPopup,
} = modalSlice.actions;

export default modalSlice.reducer;
