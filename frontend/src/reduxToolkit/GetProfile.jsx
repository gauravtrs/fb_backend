import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    profile: '',
    error: '',
  };
  
  const profileSlice = createSlice({
    name: 'profile',
    initialState,
    
    reducers: {
      profileRequest: (state) => {
        state.loading = true;
        state.error = '';
      },
      profileSuccess: (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = '';
      },

      profileError: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      profilePosts: (state, action) => {
        state.loading = false;
        state.profile = { ...state.profile, posts: action.payload }; 
        state.error = '';
      }
    },
})


export const { profileRequest, profileSuccess, profileError ,profilePosts} = profileSlice.actions;

export default profileSlice.reducer;