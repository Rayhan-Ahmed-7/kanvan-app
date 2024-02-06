import { createSlice } from "@reduxjs/toolkit";
interface User {
    id: string,
    username: string

}
const initialState: User = {
    id: '',
    username: ''
}
const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        addUser: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
        }
    }
});


export const { addUser } = userSlice.actions;
export default userSlice.reducer;