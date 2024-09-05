import { configureStore } from '@reduxjs/toolkit'
import MainSlice from './Slice/MainSlice'
export const store = configureStore({
  reducer: {
    stateManagement :  MainSlice

  },
})