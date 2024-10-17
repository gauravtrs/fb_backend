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
    },
})


export const { profileRequest, profileSuccess, profileError } = profileSlice.actions;

export default profileSlice.reducer;