import { combineReducers } from "@reduxjs/toolkit";
import snackbar from "./snackbar";
import user from "./userSlice";
import board from "./boardSlice";
import favourites from "./favouriteSlice";
const reducers = combineReducers({
    snackbar,
    user,
    board,
    favourites
});

export default reducers;