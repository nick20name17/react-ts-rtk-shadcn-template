import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { counterSlice } from './slices/counter'
import { api } from '@/api'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        counter: counterSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
