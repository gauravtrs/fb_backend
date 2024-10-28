import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import { LoggedInRoutes } from './routes/LoggedInRoutes';
import Login from './pages/login/Login';
import RegisterForm from './components/login/RegisterForm';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';
import ActivateUser from './pages/home/ActivateUser';
import Reset from './pages/reset/Reset';
import CreatePostPopup from './components/createPostPopup/CreatePostPopup';
import { useDispatch, useSelector } from 'react-redux';
import { postsError,postsRequest,postsSuccess } from './reduxToolkit/GetAllPostsSlice';
import axios from 'axios';
import Friends from './pages/friends/Friends';

const App = () => {
  const user =useSelector((state) =>state.user);

  
  

  
  const [visible, setVisible] = useState(false);
  const dispatch =useDispatch();
  

  
  

  useEffect(()=>{
    if(user){
      getAllData()
    }
  },[user]);
  
  const getAllData = async () => {
    try {
      dispatch(postsRequest());
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getallpost`, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Add a space here
        },
      });
  
      
      if (data) {
        dispatch(postsSuccess(data));
      }
    } catch (error) {
      dispatch(postsError(error.response?.data?.message || 'Error fetching posts'));
    }
  };
  

 
  
  return (
    <div >
           {visible && <CreatePostPopup user={user} setVisible={setVisible} /> }  
            

      <Routes>

        <Route element={<NotLoggedInRoutes/>}>
          
        <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<RegisterForm/>}/>
         
        </Route>

          <Route element={<LoggedInRoutes/>}>

          <Route path='/profile' element={<Profile setVisible={setVisible} getAllData={getAllData} />} />
          <Route path='/profile/:username' element={<Profile setVisible={setVisible} getAllData={getAllData}/>} />
          <Route path='/friends' element={<Friends setVisible={setVisible}  />} />
          <Route path='/friends/:type' element={<Friends setVisible={setVisible}  />} />

          <Route path='/' element={<Home  setVisible={setVisible} getAllData={getAllData}/>}  />
          <Route path='/activate/:token' element={<ActivateUser/>}/>


           </Route>
           <Route path='reset' element={<Reset/>}/>

      </Routes>
    </div>
  )
}
 
export default App