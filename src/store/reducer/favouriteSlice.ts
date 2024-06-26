import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../../views/feature/board/types";

const initialState: IBoard[] = [];
const favouriteSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        setFavourites: (_, action: PayloadAction<IBoard[]>) => {
            return action.payload;
        }
    }
});

export const { setFavourites } = favouriteSlice.actions;
export default favouriteSlice.reducer;