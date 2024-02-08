import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface Board {

}
const initialState: Board[] = [];
const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setBoards: (_, action: PayloadAction<Board[]>) => {
            return action.payload;
        }
    }
});

export const { setBoards } = boardSlice.actions;
export default boardSlice.reducer;