import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
    name:'user',
    initialState,

    reducers:{
        login:(state ,action )=>{

           return action.payload;
        },
    },
});

export const {login} =userSlice.actions;
export default userSlice.reducer;