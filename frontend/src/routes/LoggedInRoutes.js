import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Login from '../pages/login/Login';

export const LoggedInRoutes = () => {
    const  user  = useSelector((state) =>state.user);

    return (
        <div>{user ? <Outlet/>:<Login/>}</div>
      )
  
}
