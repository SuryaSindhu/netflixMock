import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        contentType: 'movie',
    },
    reducers: {
        setUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
        clearUser: (state) => { 
            state.user = null;
        },
        setContentType: (state, action) => {
            state.contentType = action.payload;
        }
    }
})

export const { setUser, clearUser, setContentType } = userSlice.actions;
export default userSlice.reducer;