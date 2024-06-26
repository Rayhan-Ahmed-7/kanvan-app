import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../../views/feature/board/types";

const initialState: IBoard[] = [];
const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setBoards: (_, action: PayloadAction<IBoard[]>) => {
            return action.payload;
        }
    }
});

export const { setBoards } = boardSlice.actions;
export default boardSlice.reducer;