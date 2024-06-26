import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { open: boolean } = {
  open: true,
};
const drawerSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    updateDrawer: (_, action: PayloadAction<{ open: boolean }>) => {
      return action.payload;
    },
  },
});

export const { updateDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
