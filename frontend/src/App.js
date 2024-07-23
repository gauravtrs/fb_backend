import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Login from './pages/login/Login';
import RegisterForm from './components/login/RegisterForm';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';

const App = () => {

  
  return (
    <div>
      
      <Routes>

          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<RegisterForm/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/' element={<Home/>} />

      </Routes>
    </div>
  )
}
 
export default App