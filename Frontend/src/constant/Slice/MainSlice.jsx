import { createSlice } from "@reduxjs/toolkit";
import React from "react";
// main state managment here
const initialState = {
  loading: false,
  isVisible: true,
  isFormChange :false,
};

export const MainSlice = createSlice({
  name: "stateManagement",
  initialState,
  reducers: {
    // write the the block of the code here so we get
    checPasswordVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
    formMovement : (state) =>{
        state.isFormChange = !state.isFormChange
           
    }
  },
});

// exporst the reducer action
export const { checPasswordVisibility  , formMovement} = MainSlice.actions;
export default MainSlice.reducer;
