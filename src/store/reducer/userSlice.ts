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
            state = action.payload;
        }
    }
});


export const { addUser } = userSlice.actions;
export default userSlice.reducer;