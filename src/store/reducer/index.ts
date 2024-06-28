import { combineReducers } from "@reduxjs/toolkit";
import snackbar from "./snackbar";
import user from "./userSlice";
import board from "./boardSlice";
import favourites from "./favouriteSlice";
import drawer from "./drawer";
import alertDialog from "./alertDialog";
const reducers = combineReducers({
  alertDialog,
  snackbar,
  user,
  board,
  favourites,
  drawer,
});

export default reducers;
