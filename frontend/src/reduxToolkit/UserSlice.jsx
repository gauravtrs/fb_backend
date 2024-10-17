import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const userCookie =Cookies.get('user')
const initialState = userCookie ? JSON.parse(userCookie) :null
//console.log('this is initialstate values: ',initialState)


const userSlice = createSlice({
    name:'user',
    initialState,

    reducers:{
        loginuser:(state ,action )=>{

           return action.payload;
        },



        logout:(state ) =>{
            
            Cookies.remove('user');
            return null;

        },



        verify:(state )=>{
            if(state){
                state.verified = true;
            } 
            Cookies.set('user',JSON.stringify(state))

        },

        updatePicturepic:(state ,action) =>{
            if(state){
                state.picture=action.payload ;
            }
            Cookies.set('user', JSON.stringify(state));
        },
    },
});

export const {loginuser ,verify ,logout ,updatePicturepic} =userSlice.actions;
export default userSlice.reducer; 