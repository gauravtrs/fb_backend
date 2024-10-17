import {configureStore} from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import postReducer from './GetAllPostsSlice';
import profileSlice from './GetProfile';
import photosSclice from './PhotosSlice'

const store =configureStore({

    reducer:{
        user:userReducer,
        posts:postReducer,
        profile:profileSlice,
        photos:photosSclice,

    }
})

export default store;