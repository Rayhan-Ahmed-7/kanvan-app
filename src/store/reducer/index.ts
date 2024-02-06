import { combineReducers } from "@reduxjs/toolkit";
import snackbar from "./snackbar";
import user from "./userSlice";
const reducers = combineReducers({
    snackbar,
    user
});

export default reducers;