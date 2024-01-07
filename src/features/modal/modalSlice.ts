import { createSlice, createSelector } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

import { Post, PopupType } from '@constants/index'
import { RootState } from '@store/store'

interface IInitialState {
    selectedPost: Post | undefined
    openPopupType: PopupType
}

const initialState: IInitialState = {
    selectedPost: undefined,
    openPopupType: 'close'
}

const modalSlice = createSlice({
    name: 'feature/modal',
    initialState,
    reducers: {
        setSelectedPost(state, { payload }: PayloadAction<Post>) {
            state.selectedPost = payload
        },
        setOpenPopupType(state, { payload }: PayloadAction<PopupType>) {
            state.openPopupType = payload
        }
    }
})

export const { setSelectedPost, setOpenPopupType } = modalSlice.actions

const selectOpenPopupType = (state: RootState) => state.modal.openPopupType
const selectSelectedPost = (state: RootState) => state.modal.selectedPost

export const openPopupTypeSelector = createSelector([selectOpenPopupType], (type) => type)
export const selectedPostSelector = createSelector([selectSelectedPost], (post) => post)

export const modalReducer = modalSlice.reducer
