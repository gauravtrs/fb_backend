import {configureStore} from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import postReducer from './GetAllPostsSlice';

const store =configureStore({

    reducer:{
        user:userReducer,
        posts:postReducer,

    }
})

export default store;