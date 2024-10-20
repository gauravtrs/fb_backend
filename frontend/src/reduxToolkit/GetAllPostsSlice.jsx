 import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    loading:false,
    posts:[],
    error:''
    
};




const postSlice = createSlice({
    name:'posts',
    initialState,

    reducers:{

        postsRequest:(state)=>{
            state.loading=true;
            state.error='';

        },

        postsSuccess:(state , action) =>{
            state.loading=false;
            state.posts=action.payload;
            state.error='';
        },

        postsError:(state , action) =>{
            state.loading=false;
            state.error=action.payload;
        },


    }
})

export const {postsRequest , postsSuccess ,postsError} =postSlice.actions;
export default postSlice.reducer;