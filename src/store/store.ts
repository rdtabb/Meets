import { configureStore } from '@reduxjs/toolkit'

import { modalReducer } from '@features/index'

export const store = configureStore({
    reducer: {
        modal: modalReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
