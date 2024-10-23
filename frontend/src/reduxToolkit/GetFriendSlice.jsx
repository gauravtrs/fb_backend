import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    friends: '',  // Initialize as an empty array
};

const friendSlice = createSlice({
    name: "friend",
    initialState,

    reducers: {
        friendSuccess: (state, action) => {
            state.friends = action.payload;
        },
    },
});

export const { friendSuccess } = friendSlice.actions;
export default friendSlice.reducer;
