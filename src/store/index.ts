import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as useAppDispatch, useSelector as useAppSelector, TypedUseSelectorHook } from 'react-redux';
import reducers from "./reducer";


const store = configureStore({
    reducer: reducers
});
const { dispatch } = store

export type RootState = ReturnType<typeof reducers>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
export { store, dispatch };