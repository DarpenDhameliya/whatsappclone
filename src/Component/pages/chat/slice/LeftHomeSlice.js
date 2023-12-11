import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const LeftHomeSlice = createSlice({
  name: "lefthome",
  initialState,
  reducers: {
    ClickUserValue: (state, payload) => {
      state.value = []
      state.value = payload.payload
      // state.value += 1
    },
  },
});

// Action creators are generated for each case reducer function
export const { ClickUserValue } = LeftHomeSlice.actions;

export default LeftHomeSlice.reducer;
