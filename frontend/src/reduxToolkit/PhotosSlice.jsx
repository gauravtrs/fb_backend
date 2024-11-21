import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
     photos: '',
    
    error: '',
  };
  
  const PhotosSlice = createSlice({
    name: 'photos',
    initialState,
    
    reducers: {
      photosRequest: (state) => {
        state.loading = true;
        state.error = '';
      },
      photosSuccess: (state, action) => {
        state.loading = false;
        state.photos = action.payload.resources ? action.payload : { resources: [] };
        state.error = '';
      },
      photoseError: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
})


export const { photosRequest, photosSuccess, photoseError } = PhotosSlice.actions;

export default PhotosSlice.reducer;