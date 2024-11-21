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
        if (state.profile) {
          state.profile = { ...state.profile, posts: action.payload };
        } else {
          console.error("Cannot update posts: profile is null.");
        }
        state.error = ''; // Ensure the error is cleared if no issue
      } 

      
    },
})


export const { profileRequest, profileSuccess, profileError ,profilePosts} = profileSlice.actions;

export default profileSlice.reducer;