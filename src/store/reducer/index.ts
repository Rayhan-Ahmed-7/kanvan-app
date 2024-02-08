import { combineReducers } from "@reduxjs/toolkit";
import snackbar from "./snackbar";
import user from "./userSlice";
import board from "./boardSlice";
const reducers = combineReducers({
    snackbar,
    user,
    board
});

export default reducers;