import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertDialogProps, AlertDialogType } from "../types/alertDiologType";

const initialState: AlertDialogProps = {
  open: false,
  message: "Alert Dialog",
  type: AlertDialogType.info,
  duration: 1000,
  cancelBtnText: "Cancel",
  okBtnText: "Ok",
  onCancel: () => {},
  onOk: () => {},
};

const alertDialog = createSlice({
  name: "alertDialog",
  initialState: initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<AlertDialogProps>) => {
      const {
        message,
        type,
        duration,
        cancelBtnText,
        okBtnText,
        onCancel,
        onOk,
      } = action.payload;
      state.open = true;
      state.message = message;
      state.type = type;
      state.duration = duration;
      state.cancelBtnText = cancelBtnText;
      state.okBtnText = okBtnText;
      state.onCancel = onCancel;
      state.onOk = onOk;
    },
    closeDialog: (state) => {
      state.open = false;
    },
  },
});

export default alertDialog.reducer;
export const { openDialog, closeDialog } = alertDialog.actions;
