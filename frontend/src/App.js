import React from 'react'
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
import { useSelector } from 'react-redux';

const App = () => {
  const user =useSelector((state) =>state.user)


  
  return (
    <div>
              <CreatePostPopup user={user} /> 

      <Routes>

        <Route element={<NotLoggedInRoutes/>}>
          
        <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<RegisterForm/>}/>
         
        </Route>

          <Route element={<LoggedInRoutes/>}>

          <Route path='/profile' element={<Profile/>}/>
          <Route path='/' element={<Home/>} />
          <Route path='/activate/:token' element={<ActivateUser/>}/>


           </Route>
           <Route path='reset' element={<Reset/>}/>

      </Routes>
    </div>
  )
}
 
export default App