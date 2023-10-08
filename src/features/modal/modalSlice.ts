import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../types/Types";

type PopupType = "add" | "edit" | "icon" | "image" | "confirm" | "close";

interface IInitialState {
  selectedPost: Post | undefined;
  openPopupType: PopupType;
}

const initialState: IInitialState = {
  selectedPost: undefined,
  openPopupType: "close",
};

const modalSlice = createSlice({
  name: "feature/modal",
  initialState,
  reducers: {
    setSelectedPost(state, { payload }: PayloadAction<Post>) {
      state.selectedPost = payload;
    },
    setOpenPopupType(state, { payload }: PayloadAction<PopupType>) {
      state.openPopupType = payload;
    },
  },
});

export const { setSelectedPost, setOpenPopupType } = modalSlice.actions;

const stateModalSelector = (state: RootState) => state.modal;

export const selectOpenPopupType = () =>
  createSelector([stateModalSelector], (state) => state.openPopupType);

export default modalSlice.reducer;
