import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const userCookie =Cookies.get('user')
const initialState = userCookie ? JSON.parse(userCookie) :null


const userSlice = createSlice({
    name:'user',
    initialState,

    reducers:{
        loginuser:(state ,action )=>{

           return action.payload;
        },
    },
});

export const {loginuser} =userSlice.actions;
export default userSlice.reducer;