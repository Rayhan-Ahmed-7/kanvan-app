import { SnackbarProps, SnackbarType } from "../types/snackbarType";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SnackbarProps = {
  action: false,
  open: false,
  message: "Note archived",
  type: SnackbarType.info,
  duration: 1000,
  anchorOrigin: {
    vertical: "top",
    horizontal: "right",
  },
  transition: "Fade",
  close: true,
  actionButton: false,
  maxStack: 3,
  dense: false,
  iconVariant: "usedefault",
};

const snackbar = createSlice({
  name: "snackbar",
  initialState: initialState,
  reducers: {
    openSnackbar: (state, action) => {
      const { message, type, duration } = action.payload;
      state.open = true;
      state.message = message;
      state.type = type;
      state.duration = duration;
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

export default snackbar.reducer;
export const { openSnackbar, closeSnackbar } = snackbar.actions;
